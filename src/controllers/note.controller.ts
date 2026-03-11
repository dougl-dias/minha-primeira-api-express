import type { Request, Response } from 'express'

import {
  createNote,
  deleteNote,
  findAllNotes,
  findNoteById,
  updateNote,
  type NoteDTO
} from '../services/notes.service.js'

const allowedFields = ['title', 'content', 'category', 'color']

const parseId = (req: Request, res: Response): number | null => {
  const id = Number(req.params.id)

  if (isNaN(id) || id < 0) {
    res.status(400).json({ message: 'ID Inválido' })
    return null
  }

  return id
}

const getAll = async (req: Request, res: Response) => {
  const response = findAllNotes()
  return res.status(200).json(response)
}

const getById = async (req: Request, res: Response) => {
  const id = parseId(req, res)

  if (!id) return

  if (id === -1) {
    return res.status(400).json({ message: 'ID Inválido' })
  }

  const response = await findNoteById(id)

  if (!response) {
    return res.status(404).json({ message: 'Anotação não encontrada' })
  }

  return res.status(200).json(response)
}

const create = async (req: Request, res: Response) => {
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

  const response = await createNote({
    title,
    content,
    category,
    color,
    userId
  })

  return res.status(201).json(response)
}

const update = async (req: Request, res: Response) => {
  const id = parseId(req, res)

  if (!id) return

  const data: Partial<NoteDTO> = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  )

  const response = await updateNote(id, data)

  if (!response) {
    return res.status(404).json({ message: 'Anotação não encontrada' })
  }

  return res.status(200).json(response)
}

const remove = async (req: Request, res: Response) => {
  const id = parseId(req, res)

  if (!id) return

  const response = await deleteNote(id)

  if (!response) {
    return res.status(404).json({ message: 'Anotação não encontrada' })
  }

  return res.status(204).send()
}

export { getAll, getById, create, update, remove }
