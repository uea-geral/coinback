import { Purchase, Purchase2Create } from "../entities/purchase";

export interface IProductService {
  buy(id: string, { product_name, value }: Purchase2Create): Promise<Purchase>;
  fetch(id: string): Promise<Purchase[]>;
}
