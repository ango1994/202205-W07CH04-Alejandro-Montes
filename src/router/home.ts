import { Router } from 'express';

export const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<div><h1>Visita la pagina de tareas</h1></div>
    <div><a href="http://localhost:3400/notes">Tareas</a></div>`);
});
