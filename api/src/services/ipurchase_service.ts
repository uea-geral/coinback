import {Purchase, Purchase2Create} from '../entities/purchase'

export interface IPurchaseService {
    buy(newPurchase: Purchase2Create, userId: string): Purchase | undefined
    fetchAllByUser(userId: string): Purchase[]
}
