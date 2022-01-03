import { of } from 'await-of';
import GitHubProxy from '../utils/axios/gitHubProxy';
import httpStatus from '../constant/constant';
import { repoLogger } from '../utils/logger/logger';

const getRepositories = async (req, res) => {
  try {
    const { handle } = req.params;

    repoLogger.info({ url: req.originalUrl, parameters: handle });

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
      repoLogger.error(hanlderErr.response.statusText);
      return res.status(hanlderErr.response.status).send({
        error: {
          message: hanlderErr.response.statusText,
        },
      });
    }

    const [repos, reposErr] = await of(GitHubProxy.getRepos(handler.repos_url));

    if (reposErr) {
      repoLogger.error(reposErr.response.statusText);
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

    repoLogger.info({
      ownerName: handler.name,
      repositories,
    });
    res.status(httpStatus.OK).send({
      ownerName: handler.name,
      repositories,
    });
  } catch (err) {
    repoLogger.error(err.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: {
        message: err.message,
      },
    });
  }
};

export default { getRepositories };
