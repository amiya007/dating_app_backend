import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findBy(filter) {
    try {
      const response = await User.findOne(filter);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
