import { getRepository } from "typeorm";
import { Product } from '../database/models/Product';

export class ProductsService {

  public async getAllProducts() {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    return products;
  }

}

export default new ProductsService();
