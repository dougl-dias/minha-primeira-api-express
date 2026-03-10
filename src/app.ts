import express from 'express'
import type { Request, Response } from 'express'

import { validadeId } from './util/validade.js'

type UserDTO = {
  id: number
  name: string
  email: string
  password: string
}

type NoteDTO = {
  id: number
  title: string
  content?: string
  userId: number
  category: string
  color: string
}

type DatabaseDTO = {
  user: UserDTO[]
  notes: NoteDTO[]
}

const DB: DatabaseDTO = {
  user: [
    {
      id: 1,
      name: 'Douglas Dias',
      email: 'douglas@gmail.com',
      password: 'admin123'
    },
    {
      id: 2,
      name: 'Fernanda Lima',
      email: 'fernanda@gmail.com',
      password: 'fernanda123'
    },
    {
      id: 3,
      name: 'Carlos Souza',
      email: 'carlos@gmail.com',
      password: 'carlos123'
    }
  ],

  notes: [
    {
      id: 1,
      title: 'Estudar Node.js',
      content: 'Revisar conceitos de Express, middlewares e estrutura MVC.',
      userId: 1,
      category: 'Estudos',
      color: 'yellow'
    },
    {
      id: 2,
      title: 'Comprar monitor',
      content: 'Pesquisar monitor 144Hz para melhorar performance no CS2.',
      userId: 1,
      category: 'Pessoal',
      color: 'green'
    },
    {
      id: 3,
      title: 'Planejar viagem',
      content: 'Ver passagens para viajar em julho e reservar hotel.',
      userId: 2,
      category: 'Lazer',
      color: 'sky'
    },
    {
      id: 4,
      title: 'Ideia de projeto API',
      content: 'Criar API de encurtador de URL para portfólio no GitHub.',
      userId: 1,
      category: 'Programação',
      color: 'purple'
    },
    {
      id: 5,
      title: 'Reunião com cliente',
      content: 'Discutir requisitos do novo sistema ERP.',
      userId: 3,
      category: 'Trabalho',
      color: 'pink'
    }
  ]
}

// Inicialização
const app = express()

app.use(express.json())

// Rotas
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

app
  .route('/notes')
  .get((req: Request, res: Response) => {
    return res.status(200).json(DB.notes)
  })
  .post((req: Request, res: Response) => {
    const lastNote = DB.notes[DB.notes.length - 1]

    let id: number = lastNote ? lastNote.id + 1 : 1

    const { title, content, category, color, userId } = req.body

    if (title === undefined) {
      return res.status(400).json({ message: 'Título é obrigatório' })
    }

    if (category === undefined) {
      return res.status(400).json({ message: 'Categoria é obrigatório' })
    }

    if (userId === undefined) {
      return res.status(400).json({ message: 'ID do usuário é obrigatório' })
    }

    const newNote: NoteDTO = {
      id: id,
      title: title,
      content: content ?? '',
      category: category,
      color: color ?? 'gray',
      userId: Number(userId)
    }

    DB.notes.push(newNote)

    return res.status(201).json(newNote)
  })

app
  .route('/notes/:id')
  .get((req: Request, res: Response) => {
    const id = validadeId(req.params.id as string)

    if (id === -1) {
      return res.status(400).json({ message: 'ID Inválido' })
    }

    const note = DB.notes.find((note) => note.id === id)

    if (!note) {
      return res.status(404).json({ message: 'Anotação não encontrada' })
    }

    return res.status(200).json(note)
  })
  .patch((req: Request, res: Response) => {
    const id = validadeId(req.params.id as string)

    if (id === -1) {
      return res.status(400).json({ message: 'ID Inválido' })
    }

    const noteIndex = DB.notes.findIndex((note) => note.id === id)

    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Anotação não encontrada' })
    }

    const oldNote = DB.notes[noteIndex]

    const allowedFields = ['title', 'content', 'category', 'color']

    const fields: Partial<NoteDTO> = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    )

    const updateNote = {
      ...oldNote,
      ...fields
    } as NoteDTO

    DB.notes.splice(noteIndex, 1, updateNote)

    return res.status(200).json(updateNote)
  })
  .delete((req: Request, res: Response) => {
    const id = validadeId(req.params.id as string)

    if (id === -1) {
      return res.status(400).json({ message: 'ID Inválido' })
    }

    const noteIndex = DB.notes.findIndex((note) => note.id === id)

    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Anotação não encontrada' })
    }

    DB.notes.splice(noteIndex, 1)

    return res.status(204).send()
  })

export default app
