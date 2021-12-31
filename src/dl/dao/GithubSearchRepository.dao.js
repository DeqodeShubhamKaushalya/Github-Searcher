import axios from 'axios';
import Handler from '../../db/models/user.model';
import { configuration } from '../../app';

class GithubSearchRepository {
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

  static async findHandler(handler) {
    const findHandler = await Handler.findOne({
      user_name: handler,
    }).select({
      _id: 0,
    });
    return findHandler;
  }

  static async createProfile(handlerDetails) {
    const handler = await Handler.create(handlerDetails);
    return handler;
  }
}
export default GithubSearchRepository;
