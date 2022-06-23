/* eslint-disable no-unused-vars */
import fs from 'fs/promises';

export class DataModel<T extends { id: number }> {
    data: Array<T>;
    path: string;
    constructor(private fileName: string) {
        this.data = [];
        this.path = `./src/data/${this.fileName}.json`;
    }

    private async readFile(): Promise<Array<T>> {
        return JSON.parse(await fs.readFile(this.path, { encoding: 'utf-8' }));
    }

    private async writeFile(data: Array<T>) {
        return fs.writeFile(this.path, JSON.stringify(data), {
            encoding: 'utf-8',
        });
    }

    async findAll(): Promise<Array<T>> {
        return this.readFile();
    }

    async find(id: string): Promise<T | undefined> {
        const fileData = await this.readFile();
        const item = fileData.find((item) => item.id === +id);
        return item;
    }

    async create(data: Partial<T>): Promise<T> {
        const fileData = await this.readFile();
        const newItem = { ...data, id: fileData[fileData.length - 1].id + 1 };
        fileData.push(newItem as T);
        this.writeFile(fileData);
        return newItem as T;
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        let fileData = await this.readFile();
        if (data.id) delete data.id;
        let updatedItem;
        fileData = fileData.map((item) => {
            if (item.id === +id) {
                updatedItem = { ...item, ...data };
                return updatedItem;
            } else {
                return item;
            }
        });
        this.writeFile(fileData);
        return updatedItem as unknown as T;
    }

    async delete(id: string) {
        let fileData = await this.readFile();
        const prevLength = fileData.length;
        fileData = fileData.filter((item) => item.id !== +id);
        if (prevLength === fileData.length) return { status: 404 };
        this.writeFile(fileData);
        return { status: 202 };
    }
}
