import { api } from "../../api";
import { User, User2Create } from "../../entities/user";
import { IUserService } from "../iuser_service";

export class UserService implements IUserService {
  async create(user: User2Create) {
    const { data } = await api.post<User>(`/users`, user);
    return data;
  }

  async login(user: { cpf: string; pass: string }) {
    const { data } = await api.post<User>(`/users/login`, user);
    localStorage.setItem("auth", data.id);
    return data;
  }

  async findById(id: string): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  }
}
