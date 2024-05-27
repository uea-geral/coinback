export interface Purchase {
    userId: string
    id: string
    value: number
    productName: string
}

export type Purchase2Create = Omit<Purchase, 'id' | 'userId'>
