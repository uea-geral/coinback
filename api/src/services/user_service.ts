import {randomUUID} from 'crypto'
import {User, User2Create} from '../entities/user'
import {BlockchainRepository} from './blockchain_repository'
import {IUserService} from './iuser_service'

export class UserService implements IUserService {
    private getData() {
        const data = BlockchainRepository.fetchLatest()
        const users: User[] = data['users'] || []
        return {data, users}
    }

    fetchAll(): User[] {
        const {users} = this.getData()
        return users
    }

    create(newUser: User2Create): User {
        const {data, users} = this.getData()
        const userExist = users.find(
            user => user.cpf.localeCompare(newUser.cpf) === 0,
        )
        if (userExist) return userExist
        const user: User = {
            ...newUser,
            id: randomUUID().toString(),
            cashback: 0,
        }
        users.push(user)
        data['users'] = users
        BlockchainRepository.add(data)
        return user
    }

    findByCPFAndPassword(cpf: string, pass: string): User | undefined {
        const {users} = this.getData()
        return users.find(
            user =>
                user.cpf.localeCompare(cpf) === 0 &&
                user.pass.localeCompare(pass) === 0,
        )
    }
}
