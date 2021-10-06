import 'dotenv/config';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { getRepository } from "typeorm";
import { User } from '../database/models/User';
import { Product } from '../database/models/Product';
import { ICartItem, ICredentials, IOrderData, IUser } from '../@Types/Type';

class Helpers {
  private secret: jwt.Secret;
  private jwtConfig: jwt.SignOptions;

  constructor() {
    this.secret = process.env.JWT_SECRET as jwt.Secret;
    this.jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
  }

  public generateToken(newUser: User) {
    const { id, name, email, role } = newUser;
    return jwt.sign({ id, name, email, role }, this.secret, this.jwtConfig);
  }

  public hashPassword(password: string) {
    return md5(password);
  }

  public verifyUserInfosJoi = (infos: IUser) => (
    joi.object({
      name: joi.string().min(4).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      role: joi.string().required(),
    }).validate(infos)
  );

  public verifyLoginCredentialsJoi = (credentials: ICredentials) => (
    joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    }).validate(credentials)
  );

  public getProductsIds(products: Array<ICartItem>) {
    return products.map(({ id }) => id);
  }

  public async saleStructure(orderData: IOrderData) {
    const userRepository = getRepository(User);
    const saleUser = await userRepository.findOne(
      { where: { id: orderData.userId } }
    );
    const saleSeller = await userRepository.findOne(
      { where: { id: orderData.sellerId } }
    );
    return ({
      total_price: orderData.totalCart,
      delivery_address: orderData.address,
      delivery_number: orderData.addressNumber,
      user: saleUser,
      seller: saleSeller,
      sale_date: (new Date).toLocaleString(),
      status: 'Pending',
    });
  }

}

export default Helpers;
