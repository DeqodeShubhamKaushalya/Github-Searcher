import axios from 'axios';
import { configuration } from '../../../app';

class GitHubProxyAPI {
  constructor() {
    const services = axios.create({
      headers: {
        Authorization: `token ${configuration.gitHub.gitHubAuthToken}`,
      },
    });
    this.axios = services;
  }

  static async getHandler(handle) {
    const handler = await axios.get(
      `${configuration.gitHub.apiBaseUrl}/users/${handle}`,
    );
    return handler.data;
  }

  static async getRepos(repoUrl) {
    const repos = await axios.get(`${repoUrl}`);
    return repos.data;
  }
}
export default GitHubProxyAPI;
