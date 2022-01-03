import axios from 'axios';
import config from '../../config/config';

class GitHubProxy {
  constructor() {
    const services = axios.create({
      headers: {
        Authorization: `token ${config.get().gitHub.authToken}`,
      },
    });
    this.axios = services;
  }

  static async getHandler(handle) {
    const handler = await axios.get(
      `${config.get().gitHub.api.baseUrl}/users/${handle}`,
    );
    return handler.data;
  }

  static async getRepos(repoUrl) {
    const repos = await axios.get(`${repoUrl}`);
    return repos.data;
  }
}
export default GitHubProxy;
