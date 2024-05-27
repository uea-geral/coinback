import {Request, Router} from 'express'
import {Purchase2Create} from './entities/purchase'
import {User2Create} from './entities/user'
import {PurchaseService} from './services/purchase_service'
import {UserService} from './services/user_service'

export const routes = Router()

// services
const userService = new UserService()
const purchaseService = new PurchaseService()

routes.get('/', (_, resp) => {
    return resp.send({name: 'coinback', version: '1.0', now: new Date()})
})

routes.get('/users/:id/purchases', (req, resp) => {
    const {id} = req.params
    const purchases = purchaseService.fetchAllByUser(id)
    return resp.status(200).json(purchases)
})

routes.post(
    '/users/:id/purchases',
    (req: Request<{id: string}, unknown, Purchase2Create>, resp) => {
        const {id} = req.params
        const data = req.body
        const newPurchase = purchaseService.buy(data, id)
        if (!newPurchase)
            return resp
                .status(400)
                .json({error: 'Usuário informado não existe.'})
        return resp.status(200).json(newPurchase)
    },
)

routes.post('/users', (req: Request<unknown, unknown, User2Create>, resp) => {
    const data = req.body
    const newUser = userService.create(data)
    return resp.status(200).json(newUser)
})

routes.get('/users', (_, resp) => {
    const users = userService.fetchAll()
    return resp.status(200).json(users)
})

routes.get('/users/:id', (req, resp) => {
    const {id} = req.params
    const users = userService.fetchAll()
    const user = users.find(u => u.id.localeCompare(id) === 0)
    if (!user) return resp.status(404).json({error: 'Usuário não existe'})
    return resp.status(200).json(user)
})

routes.post(
    '/users/login',
    (req: Request<unknown, unknown, {cpf: string; pass: string}>, resp) => {
        const {cpf, pass} = req.body
        const foundUser = userService.findByCPFAndPassword(cpf, pass)
        if (!foundUser)
            return resp.status(404).json({erro: 'Usuário não encontrado.'})
        return resp.status(200).json(foundUser)
    },
)
