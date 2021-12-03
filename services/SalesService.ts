import { getRepository } from "typeorm";
import Helpers from '../helpers/Helpers';
import { Sale } from "../database/models/Sale";
import { Product } from "../database/models/Product";
import { User } from "../database/models/User";
import { SaleProduct } from "../database/models/SaleProduct";
import { ICartItem, IFormatedSale, ISaleInfos } from "../@Types/Type";

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
    listItens.forEach(async (item) => {
      const currentProduct = await productRepository.findOne({ id: item.id })
      const product = new SaleProduct();
      product.product = currentProduct!;
      product.quantity = item.quantity;
      product.sale = sale;
      await saleProductRepository.save(product);
    });
    return sale;
  }

  public async getAllSalesFromUser(id: number) {
    const saleRepository = getRepository(Sale);
    const sales = await saleRepository.find(
      { relations: ['user', 'seller', 'saleProduct'] },
    );
    const userSales = sales.filter((sale) => (
      sale.user.id === id || sale.seller.id === id
    ));
    const result = userSales.map((sale) => {
      const { user, seller } = sale;
      const userWithoutPass = this.helpers.removePassword(user);
      const sellerWithoutPass = this.helpers.removePassword(seller);
      return {
        ...sale,
        user: userWithoutPass,
        seller: sellerWithoutPass,
      }
    });
    return result;
  }

  public async getProductsFromSale(saleProduct: Array<SaleProduct>) {
    const saleProductRepository = getRepository(SaleProduct);
    const saleProducts = await saleProductRepository.findByIds(
      saleProduct.map(({ id }) => id),
      { relations: ['product'] },
    );
    const products: Array<ICartItem> = saleProducts.map((item) => {
      const { quantity, product } = item;
      const { url_image, ...necessaryInfos } = product;
      return { ...necessaryInfos, quantity };
    });
    return products;
  }

  public async getSale(id: number) {
    const saleRepository = getRepository(Sale);
    const sale = await saleRepository.findOne(
      id,
      { relations: ['user', 'seller', 'saleProduct'] },
    );
    if (!sale) return;
    const products = await this.getProductsFromSale(sale.saleProduct);
    const saleWithProducts = this.helpers.formatSale(sale, products);
    const { user, seller } = saleWithProducts;
    const userWithoutPass = this.helpers.removePassword(user);
    const sellerWithoutPass = this.helpers.removePassword(seller);
    const formatedSale: IFormatedSale = {
      ...saleWithProducts,
      user: userWithoutPass,
      seller: sellerWithoutPass,
    }
    return formatedSale;
  }

  public async updateSaleStatus(id: number, status: string) {
    const saleRepository = getRepository(Sale);
    await saleRepository.update(id, { status });
    return saleRepository.findOne({ id });
  }

}

export default new SalesService();
