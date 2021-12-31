import { of } from 'await-of';
import GithubSearchRepository from '../dl/dao/GithubSearchRepository.dao';
import httpStatus from '../constant/constant';

const profile = async (req, res) => {
  try {
    const { handle } = req.params;

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
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: {
          message: hanlderErr.message,
        },
      });
    }

    if (!handler) {
      // Get handler details from GitHub
      const [gitHandler, gitHandlerErr] = await of(
        GithubSearchRepository.getHandler(handle),
      );

      if (gitHandlerErr) {
        res.status(gitHandlerErr.response.status).send({
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
        memberSince_date: gitHandler.created_at,
      };

      // Save handler info
      const [addProfile, addProfileErr] = await of(
        GithubSearchRepository.createProfile({
          user_name: gitHandler.login,
          image: gitHandler.avatar_url,
          image_url: gitHandler.html_url,
          followers_count: gitHandler.followers,
          following_count: gitHandler.following,
          repo_count: gitHandler.public_repos,
          member_since_date: gitHandler.created_at,
        }),
      );

      if (addProfileErr) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: {
            message: addProfileErr.message,
          },
        });
      }

      return res.status(httpStatus.OK).send({
        profile: profileDetails,
      });
    }

    const profileDetails = {
      userName: handler.user_name,
      image: handler.image,
      imageUrl: handler.image_url,
      followersCount: handler.followers_count,
      followingCount: handler.following_count,
      repoCount: handler.repo_count,
      memberSince_date: handler.member_since_date,
    };

    res.status(httpStatus.OK).send({
      profile: profileDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: err.message,
      },
    });
  }
};

export default { profile };
