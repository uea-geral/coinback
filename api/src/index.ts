import 'dotenv/config'
import express from 'express'
import {Blockchain} from './blockchain/blockchain'
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, resp) => {
    const blockchain = new Blockchain(2)
    blockchain.addBlock(
        blockchain.createBlock(JSON.stringify({name: 'Gabriel'})),
    )
    blockchain.addBlock(blockchain.createBlock(JSON.stringify({name: 'Lima'})))
    return resp.json(blockchain)
})

app.listen(PORT)
