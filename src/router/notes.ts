import { Router } from 'express';
import { DataController } from '../controllers/data-controller.js';
import { Notes } from '../models/notes.model.js';

export const notesController = new DataController(new Notes('notes'));
export const notesRouter = Router();

notesRouter.get('/', notesController.getAllController);
notesRouter.get('/:id', notesController.getController);
notesRouter.post('/', notesController.postController);
notesRouter.patch('/:id', notesController.patchController);
notesRouter.delete('/:id', notesController.deleteController);
