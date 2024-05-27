import {Block} from '../blockchain/block'
import {Blockchain} from '../blockchain/blockchain'

const DIFFICULTY = 2
const blockchain = new Blockchain(DIFFICULTY)

type JSONData = any

export class BlockchainRepository {
    static add(data: JSONData) {
        const newBlock = blockchain.createBlock(JSON.stringify(data))
        blockchain.addBlock(newBlock)
        return newBlock
    }

    static parseData(block: Block) {
        return JSON.parse(block.getData())
    }

    static fetchLatest() {
        return BlockchainRepository.parseData(blockchain.getLastBlock())
    }
}
