import { CONTRACT_ADDRESS } from "@/app/constants";
import { Purchase, Purchase2Create } from "@/app/entities/purchase";
import Web3 from "web3";
import { IProductService } from "../iproduct_service";
import { ABI } from "./metamask";
import { generateId } from "./utils/generate_id";

export class Web3ProductService implements IProductService {
  constructor(private provider: Web3, private account: string) {}

  private getContract() {
    const contract = new this.provider.eth.Contract(ABI, CONTRACT_ADDRESS);
    return contract;
  }

  async buy(
    id: string,
    { product_name, value }: Purchase2Create
  ): Promise<Purchase> {
    const contract = this.getContract();
    const purchaseId = generateId();
    await contract.methods.makePurchase(purchaseId, product_name, value).send({
      from: this.account,
      gas: "1000000",
      gasPrice: "10000000000",
    });
    return {
      id: purchaseId,
      product_name,
      value,
      userId: id,
    };
  }

  async fetch(id: string): Promise<Purchase[]> {
    const contract = this.getContract();
    const purchases = await contract.methods.getPurchases().call();
    return purchases.filter((p) => p.user == id);
  }
}
