import Handler from '../db/models/user.model';

class GithubSearchRepository {
  static findHandler(handler) {
    return Handler.findOne({
      user_name: handler,
    }).select({
      _id: 0,
    });
  }

  static createProfile(handlerDetails) {
    return Handler.create(handlerDetails);
  }
}

export default GithubSearchRepository;
