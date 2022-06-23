/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';
import { mongoConnect } from '../db/mongodb.js';
import { DataModel } from './data-model.js';

export interface iNotes {
    id: number;
    author: string;
    content: string;
    isImportant: boolean;
}

export class Notes extends DataModel<iNotes> implements iNotes {
    id: number;
    constructor(
        public author: string = '',
        public content: string = '',
        public isImportant: boolean = false
    ) {
        super('task-db');
        this.id = 0;
    }

    async findAll(): Promise<Array<iNotes>> {
        const { connect, collection } = await mongoConnect(
            'ISDI20225',
            'notes'
        );
        const cursor = collection.find();
        const result = await (cursor.toArray() as unknown as Promise<
            Array<iNotes>
        >);
        connect.close();
        return result;
    }

    async find(id: string): Promise<iNotes | undefined> {
        const { connect, collection } = await mongoConnect(
            'ISDI20225',
            'notes'
        );
        const dbId = new ObjectId(id);
        const result = (await collection.findOne({
            _id: dbId,
        })) as unknown as iNotes;
        if (result === null) return undefined;
        connect.close();
        return result;
    }
    async create(data: Partial<iNotes>): Promise<iNotes> {
        const { connect, collection } = await mongoConnect(
            'ISDI20225',
            'notes'
        );
        const result = (await collection.insertOne(
            data
        )) as unknown as Promise<any>;
        connect.close();
        return result;
    }
    async update(id: string, data: Partial<iNotes>): Promise<iNotes> {
        const { connect, collection } = await mongoConnect(
            'ISDI20225',
            'notes'
        );
        const dbId = new ObjectId(id);
        const result = (await collection.findOneAndUpdate(
            { _id: dbId },
            { $set: { ...data } }
        )) as unknown as Promise<any>;
        connect.close();
        return result;
    }

    async delete(id: string) {
        const { connect, collection } = await mongoConnect(
            'ISDI20225',
            'notes'
        );
        const dbId = new ObjectId(id);
        const result = await collection.findOneAndDelete({ _id: dbId });
        connect.close();

        if (!result.value) return { status: 404 };
        return { status: 202 };
    }
}
