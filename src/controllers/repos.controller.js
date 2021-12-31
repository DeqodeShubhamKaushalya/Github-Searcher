import { of } from 'await-of';
import GithubSearchRepository from '../dl/dao/GithubSearchRepository.dao';
import httpStatus from '../constant/constant';

const getRepositories = async (req, res) => {
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

    const [handler, hanlderErr] = await of(
      GithubSearchRepository.getHandler(handle),
    );

    if (hanlderErr) {
      res.status(hanlderErr.response.status).send({
        error: {
          message: hanlderErr.response.statusText,
        },
      });
    }

    const [repos, reposErr] = await of(
      GithubSearchRepository.getRepos(handler.repos_url),
    );

    if (reposErr) {
      res.status(reposErr.response.status).send({
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

    res.status(httpStatus.OK).send({
      ownerName: handler.name,
      repositories,
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

export default { getRepositories };
