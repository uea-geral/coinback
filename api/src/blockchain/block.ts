import {createHash} from 'crypto'

export class Block {
    private nonce: number
    public hash: string

    constructor(
        private index: number,
        private timestamp: number,
        private previuosHash: string,
        private data: string,
    ) {
        this.nonce = 0
        this.hash = Block.calculateHash(this)
    }

    private getContent(): string {
        return `${this.index}${this.timestamp}${this.previuosHash}${this.data}${this.nonce}`
    }

    public getHash(): string {
        return this.hash
    }

    public getPreviousHash(): string {
        return this.previuosHash
    }

    public getIndex(): number {
        return this.index
    }

    public static calculateHash(block: Block): string {
        const newHash = createHash('SHA-256')
            .update(block.getContent())
            .digest('hex')
        return newHash
    }

    public proofOfWork(difficulty: number): void {
        this.nonce = 0
        const difficultySubstring = '0'.repeat(difficulty)
        while (!this.getHash().startsWith(difficultySubstring)) {
            this.nonce++
            this.hash = Block.calculateHash(this)
        }
    }
}
