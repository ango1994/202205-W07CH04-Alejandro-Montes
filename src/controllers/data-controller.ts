/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { DataModel } from '../models/data-model.js';

export class DataController {
    constructor(public model: DataModel<any>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(await this.model.findAll()));
    };

    getController = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');
        console.log(req.params.id);
        const result = await this.model.find(req.params.id);
        if (result) {
            resp.end(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.end(JSON.stringify({}));
        }
    };

    postController = async (req: Request, resp: Response) => {
        const newTask = await this.model.create(req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify(newTask));
    };

    patchController = async (req: Request, resp: Response) => {
        const newTask = await this.model.update(req.params.id, req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(newTask));
    };

    deleteController = async (req: Request, resp: Response) => {
        const { status } = await this.model.delete(req.params.id);
        resp.status(status);
        resp.end(JSON.stringify({}));
    };
}
