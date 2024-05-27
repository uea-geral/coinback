import {Block} from './block'

export class Blockchain {
    public chain: Block[]

    constructor(private difficulty: number) {
        this.chain = []
        this.init()
    }

    private init() {
        const genesis = new Block(0, new Date().getTime(), '0', '{}')
        genesis.proofOfWork(this.difficulty)
        this.chain.push(genesis)
    }

    private getLength() {
        return this.chain.length
    }

    public getLastBlock() {
        return this.chain[this.getLength() - 1]
    }

    public createBlock(data: string) {
        return new Block(
            this.getLength(),
            new Date().getTime(),
            this.getLastBlock().getHash(),
            data,
        )
    }

    public addBlock(block: Block) {
        block.proofOfWork(this.difficulty)
        this.chain.push(block)
    }

    private isBlockValid(block: Block, previousBlock: Block) {
        if (block.getIndex() != previousBlock.getIndex() + 1) return false
        if (
            block.getPreviousHash().localeCompare(previousBlock.getHash()) !== 0
        )
            return false
        if (block.getHash().localeCompare(Block.calculateHash(block)) != 0)
            return false
        return true
    }

    private isGenesisBlockValid() {
        const block = this.chain[0]
        if (block.getIndex() != 0) return false
        if (block.getPreviousHash().localeCompare('0') != 0) return false
        if (block.getHash().localeCompare(Block.calculateHash(block)) != 0)
            return false
        return true
    }

    public isValid() {
        if (!this.isGenesisBlockValid()) return false
        for (let index = 1; index < this.getLength(); index++) {
            const block = this.chain[index]
            const previousBlock = this.chain[index - 1]
            if (!this.isBlockValid(block, previousBlock)) return false
        }
        return true
    }
}
