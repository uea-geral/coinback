import { CONTRACT_ADDRESS } from "@/app/constants";
import { User, User2Create } from "@/app/entities/user";
import Web3 from "web3";
import { IUserService } from "../iuser_service";
import { ABI } from "./metamask";
import { generateId } from "./utils/generate_id";

export class Web3UserService implements IUserService {
  constructor(private provider: Web3, private account: string) {}

  private getContract() {
    const contract = new this.provider.eth.Contract(ABI, CONTRACT_ADDRESS);
    return contract;
  }

  async create(user: User2Create): Promise<User> {
    const contract = this.getContract();
    const transaction = await contract.methods
      .registerUser(user.cpf, generateId(), user.name, user.pass)
      .send({
        from: this.account,
        gas: "1000000",
        gasPrice: "10000000000",
      });
    const createdUser = await this.getUserByAddress(transaction.from);
    return createdUser;
  }

  async login(user: { cpf: string; pass: string }): Promise<User> {
    localStorage.removeItem("auth");
    const contract = this.getContract();
    const address = await contract.methods
      .getUserAddressByCPF(user.cpf)
      .call<string>();
    const foundUser = await this.getUserByAddress(address);
    if (foundUser && foundUser.pass === user.pass) {
      localStorage.setItem("auth", foundUser.id);
      return foundUser;
    }
    throw new Error("Usuário e/ou senha incorretos.");
  }

  async getUserByAddress(address: string): Promise<User> {
    const contract = this.getContract();
    const foundUser = await contract.methods
      .getUser(address)
      .call<{ [key: string]: any }>();
    return {
      id: foundUser["id"],
      cpf: foundUser["cpf"],
      name: foundUser["name"],
      pass: foundUser["pass"],
      cashback: foundUser["cashback"],
    };
  }
}
