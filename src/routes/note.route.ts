import express from 'express'

import * as controller from '../controllers/note.controller.js'

const noteRouter = express.Router()

noteRouter.route('/').get(controller.getAll).post(controller.create)

noteRouter
  .route('/:id')
  .get(controller.getById)
  .patch(controller.update)
  .delete(controller.remove)

export default noteRouter
