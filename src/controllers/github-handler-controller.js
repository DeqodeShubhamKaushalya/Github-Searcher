import { of } from 'await-of';
import GithubSearchRepository from '../repositories/github-search-repository';
import GitHubProxy from '../utils/axios/gitHubProxy';
import httpStatus from '../constant/constant';
import logger from '../utils/logger/logger';

const profile = async (req, res) => {
  try {
    const { handle } = req.params;

    logger.info({ url: req.originalUrl, parameters: handle });

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
      logger.error(hanlderErr.message);
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
        logger.error(gitHandlerErr.response.statusText);
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
        logger.error(addProfileErr.message);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: {
            message: addProfileErr.message,
          },
        });
      }

      logger.info(profileDetails);
      return res.status(httpStatus.OK).send({
        profile: profileDetails,
      });
    }

    logger.info(handler);
    res.status(httpStatus.OK).send({
      profile: handler,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: err.message,
      },
    });
  }
};

const getRepositories = async (req, res) => {
  try {
    const { handle } = req.params;

    logger.info({ url: req.originalUrl, parameters: handle });

    if (!handle) {
      res.status(httpStatus.NOT_FOUND).send({
        success: false,
        error: {
          message: 'handle is required.',
        },
      });
    }

    const [handler, hanlderErr] = await of(GitHubProxy.getHandler(handle));

    if (hanlderErr) {
      logger.error(hanlderErr.response.statusText);
      return res.status(hanlderErr.response.status).send({
        error: {
          message: hanlderErr.response.statusText,
        },
      });
    }

    const [repos, reposErr] = await of(GitHubProxy.getRepos(handler.repos_url));

    if (reposErr) {
      logger.error(reposErr.response.statusText);
      return res.status(reposErr.response.status).send({
        error: {
          message: reposErr.response.statusText,
        },
      });
    }

    const repositories = repos.map((repoHanlder) => ({
      repoName: repoHanlder.name,
      description: repoHanlder.description,
      starsCount: repoHanlder.stargazers_count,
      repoUrl: repoHanlder.html_url,
    }));

    logger.info({
      ownerName: handler.name,
      repositories,
    });
    res.status(httpStatus.OK).send({
      ownerName: handler.name,
      repositories,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: err.message,
      },
    });
  }
};

export default { profile, getRepositories };
