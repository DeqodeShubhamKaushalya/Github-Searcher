import Handler from '../db/models/user.model';

class GithubSearchRepository {
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
