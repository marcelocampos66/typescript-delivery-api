import { getRepository } from "typeorm";
import Helpers from '../helpers/Helpers';
import { User } from '../database/models/User';
import { ICredentials, IUser } from '../@Types/Type';

export class UsersService {
  private helpers: Helpers;

  constructor() {
    this.helpers = new Helpers();
  }

  public async registerUser({ name, email, password, role }: IUser) {
    const userRepository = getRepository(User);
    const hashedPassword = this.helpers.hashPassword(password);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await userRepository.save(user);
    const token = this.helpers.generateToken(user);
    return ({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      theme: true,
    });
  }

  public async login({ email, password }: ICredentials) {
    const userRepository = getRepository(User);
    const hashedPassword = this.helpers.hashPassword(password);
    const userWithHashPass = { email, password: hashedPassword };
    const user = await userRepository.findOne({ where: userWithHashPass });
    if (!user) return;
    const token = this.helpers.generateToken(user);
    return ({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      theme: true,
    });
  }

  public async getAllUsers() {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return users;
  }

  public async deleteUser(id: number) {
    const userRepository = getRepository(User);
    const result = await userRepository.delete(id);
    if (result.affected === 0) return;
    return { message: 'User successfully deleted' };
  }

}

export default new UsersService();
