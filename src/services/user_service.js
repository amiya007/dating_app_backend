import UserRepository from "../repository/user_repository";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      throw { error };
    }
  }
  async getUserByEmail() {}
}
