type User = {
  id: number
  name: string
  email: string
  password: string
}

type Note = {
  id: number
  title: string
  content?: string
  userId: number
  category: string
  color: string
}

export type NoteDTO = Omit<Note, 'id'>

type Database = {
  user: User[]
  notes: Note[]
}

const DB: Database = {
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

const findAllNotes = (): Note[] => {
  return DB.notes
}

const findNoteById = (id: number): Note | null => {
  const note = DB.notes.find((note) => note.id === id)
  return note ? note : null
}

const createNote = (data: NoteDTO): Note => {
  const lastNote = DB.notes[DB.notes.length - 1]

  let id: number = lastNote ? lastNote.id + 1 : 1

  const newNote: Note = {
    id: id,
    title: data.title,
    content: data.content ?? '',
    category: data.category,
    color: data.color ?? 'gray',
    userId: Number(data.userId)
  }

  DB.notes.push(newNote)

  return newNote
}

const updateNote = (id: number, data: Partial<NoteDTO>): Note | null => {
  const noteIndex = DB.notes.findIndex((note) => note.id === id)

  if (noteIndex === -1) return null

  const oldNote = DB.notes[noteIndex]

  const noteUpdated = {
    ...oldNote,
    ...data
  } as Note

  DB.notes.splice(noteIndex, 1, noteUpdated)

  return noteUpdated
}

const deleteNote = (id: number) => {
  const noteIndex = DB.notes.findIndex((note) => note.id === id)

  if (noteIndex === -1) return -1

  return DB.notes.splice(noteIndex, 1)
}

export { findAllNotes, findNoteById, createNote, updateNote, deleteNote }
