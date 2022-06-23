import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { homeRouter } from './router/home.js';
// import path from 'path'

import { notesRouter } from './router/notes.js';

export const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(express.json());

export interface ExtraRequest extends Request {
    calculo: number;
}

app.use((req, res, next) => {
    req;
    res;
    console.log('Soy un middlewares');
    (req as ExtraRequest).calculo = 47_638;
    next();
});

app.use('/', homeRouter);
app.use('/notes', notesRouter);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
    req;
    resp;
    next;
    console.log(error.message);
});
