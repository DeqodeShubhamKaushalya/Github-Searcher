import express from 'express';
import { Octokit } from 'octokit';
import axios from 'axios';
import dbConnection from './db/config/dbconnection';
import connectionDetails from '../index';

const app = express();

// Create application/json parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/repo-handler', async (req, res) => {
  try {
    const { handle } = req.body;

    if (!handle) {
      res.send({
        success: false,
        status_code: 400,
        error: {
          message: 'handle is required.',
        },
      });
    }

    const handleDetails = await axios.get(
      `https://api.github.com/search/users?q=${handle}`,
      {
        headers: {
          Authorization: 'token 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',
        },
      },
    );

    console.log(handleDetails);
    if (handleDetails.data.total_count <= 0) {
      res.send({
        success: true,
        status_code: 404,
        error: {
          message: 'handle not found.',
        },
      });
    }

    // const handleRepos = await axios.get(`${handleDetails.data.repos_url}`, {
    //   headers: {
    //     Authorization: 'token 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',
    //   },
    // });

    // const repos = await octokit.request('GET /search/repositories', {
    //   q: repo,
    // });

    // if (!repos.data) {
    //   res.send('data');
    // }

    // const user = await octokit.request('GET /users/{username}', {
    //   username: 'DeqodeShubhamKaushalya',
    // });

    // res.send(handleRepos.data);
  } catch (err) {
    console.log(err);
    // res.send({
    //   success: false,
    //   status_code: err.status,
    //   error: {
    //     message: err.message,
    //   },
    // });
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
