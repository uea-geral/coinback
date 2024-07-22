import { User, User2Create } from "../entities/user";

export interface IUserService {
  create(user: User2Create): Promise<User>;
  login(user: { cpf: string; pass: string }): Promise<User>;
  getUserByAddress(id: string): Promise<User>;
}
