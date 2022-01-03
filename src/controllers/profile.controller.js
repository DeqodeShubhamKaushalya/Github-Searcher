import { of } from 'await-of';
import GithubSearchRepository from '../repositories/github.search.repository';
import GitHubProxy from '../utils/services/axios/gitHubURL';
import httpStatus from '../constant/constant';
import { profileLogger } from '../utils/logger/logger';

const profile = async (req, res) => {
  try {
    const { handle } = req.params;

    profileLogger.info({ url: req.originalUrl, parameters: handle });

    if (!handle) {
      res.status(httpStatus.NOT_FOUND).send({
        success: false,
        error: {
          message: 'handle is required.',
        },
      });
    }

    // Find handler details from database
    const [handler, hanlderErr] = await of(
      GithubSearchRepository.findHandler(handle),
    );

    if (hanlderErr) {
      profileLogger.error(hanlderErr.message);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: {
          message: hanlderErr.message,
        },
      });
    }

    if (!handler) {
      // Get handler details from GitHub
      const [gitHandler, gitHandlerErr] = await of(
        GitHubProxy.getHandler(handle),
      );

      if (gitHandlerErr) {
        profileLogger.error(gitHandlerErr.response.statusText);
        return res.status(gitHandlerErr.response.status).send({
          error: {
            message: gitHandlerErr.response.statusText,
          },
        });
      }

      const profileDetails = {
        userName: gitHandler.login,
        image: gitHandler.avatar_url,
        imageUrl: gitHandler.html_url,
        followersCount: gitHandler.followers,
        followingCount: gitHandler.following,
        repoCount: gitHandler.public_repos,
        memberSinceDate: gitHandler.created_at,
      };

      // Save handler info
      const [addProfile, addProfileErr] = await of(
        GithubSearchRepository.createProfile(profileDetails),
      );

      if (addProfileErr) {
        profileLogger.error(addProfileErr.message);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: {
            message: addProfileErr.message,
          },
        });
      }

      profileLogger.info(profileDetails);
      return res.status(httpStatus.OK).send({
        profile: profileDetails,
      });
    }

    profileLogger.info(handler);
    res.status(httpStatus.OK).send({
      profile: handler,
    });
  } catch (err) {
    profileLogger.error(err.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: err.message,
      },
    });
  }
};

export default { profile };
