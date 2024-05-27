import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import {routes} from './routes'
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT)
