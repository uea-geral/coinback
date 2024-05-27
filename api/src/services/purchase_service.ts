import {randomUUID} from 'crypto'
import {Purchase, Purchase2Create} from '../entities/purchase'
import {User} from '../entities/user'
import {BlockchainRepository} from './blockchain_repository'
import {IPurchaseService} from './ipurchase_service'

export const COMMISSION_PERCENT = 0.1
export const CASHBACK_PERCENT = 0.1

export class PurchaseService implements IPurchaseService {
    private getData() {
        const data = BlockchainRepository.fetchLatest()
        const users: User[] = data['users'] || []
        const purchases: Purchase[] = data['purchases'] || []
        return {data, users, purchases}
    }

    buy(newPurchase: Purchase2Create, userId: string): Purchase | undefined {
        const {data, users, purchases} = this.getData()
        const user = users.find(user => user.id.localeCompare(userId) === 0)
        if (!user) return
        const purchase: Purchase = {
            ...newPurchase,
            id: randomUUID().toString(),
            userId,
        }
        purchases.push(purchase)
        data['purchases'] = purchases
        user.cashback += purchase.value * COMMISSION_PERCENT * CASHBACK_PERCENT
        data['users'] = users.map(u => {
            if (u.id.localeCompare(userId) == 0) return user
            return u
        })
        BlockchainRepository.add(data)
        return purchase
    }

    fetchAllByUser(userId: string): Purchase[] {
        const {data, users, purchases} = this.getData()
        const userExists = users.find(
            user => user.id.localeCompare(userId) === 0,
        )
        if (!userExists) return []
        return purchases.filter(
            purchase => purchase.userId.localeCompare(userId) === 0,
        )
    }
}
