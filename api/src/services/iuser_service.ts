import {User, User2Create} from '../entities/user'

export interface IUserService {
    create(newUser: User2Create): User
    findByCPFAndPassword(cpf: string, pass: string): User | undefined
    fetchAll(): User[]
}
