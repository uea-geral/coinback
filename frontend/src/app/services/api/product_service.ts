import { api } from "../../api";
import { Purchase, Purchase2Create } from "../../entities/purchase";
import { IProductService } from "../iproduct_service";

export class ProductService implements IProductService {
  async buy(id: string, { product_name, value }: Purchase2Create) {
    const { data } = await api.post<Purchase>(`/users/${id}/purchases`, {
      product_name,
      value,
    });
    return data;
  }

  async fetch(id: string): Promise<Purchase[]> {
    const { data } = await api.get<Purchase[]>(`/users/${id}/purchases`);
    return data;
  }
}
