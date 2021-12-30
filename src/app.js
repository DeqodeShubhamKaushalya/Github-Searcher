import express from 'express';
import { of } from 'await-of';
import dbConnection from './db/config/dbconnection';
import connectionDetails from '../index';
import GithubSearchRepository from './dl/dao/GithubSearchRepository.dao';

const app = express();

// Create application/json parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/users/:handle/repositories', async (req, res) => {
  try {
    const { handle } = req.params;

    if (!handle) {
      res.status(400).send({
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

    res.status(200).send({
      ownerName: handler.name,
      repositories,
    });
  } catch (err) {
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
});

// Get and store handler details
app.post('/api/users/:handle/profile', async (req, res) => {
  try {
    const { handle } = req.params;

    if (!handle) {
      res.status(400).send({
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
      res.status(500).send({
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

      const profile = {
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
        res.status(500).send({
          error: {
            message: addProfileErr.message,
          },
        });
      }

      return res.status(200).send({
        profile: profile,
      });
    }

    const profile = {
      userName: handler.user_name,
      image: handler.image,
      imageUrl: handler.image_url,
      followersCount: handler.followers_count,
      followingCount: handler.following_count,
      repoCount: handler.repo_count,
      memberSince_date: handler.member_since_date,
    };

    res.status(200).send({
      profile: profile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
});

// Establish connection
const appStart = async () => {
  try {
    await dbConnection();
    app.listen(connectionDetails.APP_PORT);
    console.log(`app listening at port: ${connectionDetails.APP_PORT}`);
  } catch (err) {
    console.error(err);
  }
};

export default appStart;
