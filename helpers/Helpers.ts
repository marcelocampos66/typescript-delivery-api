import 'dotenv/config';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { User } from '../database/models/User';
import { ICartItem, ICredentials, IUser } from '../@Types/Type';
import { Sale } from '../database/models/Sale';

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

  public formatSale(sale: Sale, products: Array<ICartItem>) {
    const { saleProduct, ...necessaryInfos } = sale;
    const newSale = { ...necessaryInfos, products };
    return newSale;
  }

}

export default Helpers;
