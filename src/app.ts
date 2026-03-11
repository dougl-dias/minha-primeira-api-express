import express from 'express'
import type { Request, Response } from 'express'

import noteRouter from './routes/note.route.js'

// Inicialização
const app = express()

app.use(express.json())

// Rotas
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/notes', noteRouter)

export default app
