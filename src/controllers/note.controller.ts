import {
  createNote,
  deleteNote,
  findAllNotes,
  findNoteById,
  updateNote
} from '../services/note.service.js'

import { idSchema, noteFilterSchema, noteSchema, updateNoteSchema } from '../schema/schemas.js'

import type { Request, Response } from 'express'

const getAll = async (req: Request, res: Response) => {
  try {
    const filters = noteFilterSchema.parse(req.query)

    const response = await findAllNotes(filters)

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const getById = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id)

    const response = await findNoteById(id)

    if (!response) {
      return res.status(404).json({ message: 'Anotação não encontrada' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const data = noteSchema.parse(req.body)

    const response = await createNote(data)
    return res.status(201).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id)
    const data = updateNoteSchema.parse(req.body)

    const response = await updateNote(id, data)

    if (!response) {
      return res.status(404).json({ message: 'Anotação não encontrada' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id)

    const response = await deleteNote(id)

    if (!response) {
      return res.status(404).json({ message: 'Anotação não encontrada' })
    }

    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

export { getAll, getById, create, update, remove }
