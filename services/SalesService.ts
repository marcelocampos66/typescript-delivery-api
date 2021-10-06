import { getRepository } from "typeorm";
import Helpers from '../helpers/Helpers';
import { ISaleInfos } from "../@Types/Type";
import { Sale } from "../database/models/Sale";
import { Product } from "../database/models/Product";
import { User } from "../database/models/User";
import { SaleProduct } from "../database/models/SaleProduct";

export class SalesService {
  private helpers: Helpers;

  constructor() {
    this.helpers = new Helpers();
  }

  public async getUserAndSeller(userId: number, sellerId: number) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(
      { where: { id: userId } }
    );
    const seller = await userRepository.findOne(
      { where: { id: sellerId } }
    );
    return { user, seller };
  }

  public async registerSale({ orderData, listItens }: ISaleInfos) {
    const saleRepository = getRepository(Sale);
    const productRepository = getRepository(Product);
    const saleProductRepository = getRepository(SaleProduct);


    const sellerAndUser = await this.getUserAndSeller(
      orderData.userId, orderData.sellerId
    );

    const sale = new Sale();
    sale.delivery_address = orderData.address;
    sale.delivery_number = orderData.addressNumber;
    sale.total_price = orderData.totalCart;
    sale.sale_date = (new Date).toLocaleString();
    sale.status = 'Pending';
    sale.user = sellerAndUser.user!;
    sale.seller = sellerAndUser.seller!;
    await saleRepository.save(sale);
    
    const arrSaleProducts: Array<SaleProduct> = [];
    listItens.forEach(async (item) => {
      const currentProduct = await productRepository.findOne({ id: item.id })
      const product = new SaleProduct();
      product.product = currentProduct!;
      product.quantity = item.quantity;
      product.sale = sale;
      await saleProductRepository.save(product);
      arrSaleProducts.push(product);
    });

    return sale;
  }

  public async getSale(id: number) {
    const saleRepository = getRepository(Sale);
    const sale = saleRepository.findOne(
      id,
      { relations: ['user', 'seller', 'saleProduct'] },
    );
    if (!sale) return;
    return sale;
  }

}

export default new SalesService();
