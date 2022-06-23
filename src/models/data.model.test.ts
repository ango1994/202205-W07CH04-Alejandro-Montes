import fs from 'fs/promises';
import { DataModel } from './data-model';

jest.mock('fs/promises');

describe('Given a instantiated model DataModel', () => {
    let model: DataModel<any>;
    let result: string;
    let mockItem = { id: 1, test: 'test' };
    beforeEach(() => {
        result = JSON.stringify([mockItem]) as string;
        (fs.readFile as jest.Mock).mockResolvedValue(result);
        model = new DataModel('test-db');
    });

    describe('When method findAll is called', () => {
        test('Then fs.readFile should be called', async () => {
            await model.findAll();
            expect(fs.readFile).toHaveBeenCalled();
        });
    });

    describe('When method find is called', () => {
        test('Then an item should be found', async () => {
            const result = await model.find('1');
            expect(fs.readFile).toHaveBeenCalled();
            expect(result).toStrictEqual(mockItem);
        });
    });

    describe('When method create is called', () => {
        test('Then an item should be created', async () => {
            const result = await model.create(mockItem);
            expect(fs.writeFile).toHaveBeenCalled();
            expect(result).toStrictEqual({ ...mockItem, id: mockItem.id + 1 });
        });
    });

    describe('When method update is called', () => {
        test('Then an item should be updated', async () => {
            const updatedPartial = { test: 'newTest' };
            const result = await model.update('1', updatedPartial);
            expect(fs.writeFile).toHaveBeenCalled();
            expect(result.test).toBe(updatedPartial.test);
        });
    });

    describe('When method delete is called with a valid id', () => {
        test('Then an item should be  deleted', async () => {
            const result = await model.delete('1');
            expect(result.status).toBe(202);
        });
    });

    describe('When method delete is called with a not valid id', () => {
        test('Then an item should not be  deleted', async () => {
            const result = await model.delete('4');
            expect(result.status).toBe(404);
        });
    });
});
