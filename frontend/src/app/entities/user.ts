export interface User {
    id: string
    name: string
    cpf: string
    pass: string
    cashback: number
}

export type User2Create = Omit<User, 'id' | 'cashback'>
