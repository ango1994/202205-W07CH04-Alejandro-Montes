/* eslint-disable no-unused-vars */
import { mongoConnect } from '../db/mongodb.js';
import { Notes } from './notes.model';

jest.mock('../db/mongodb.js');

describe('Given a instantiated model Notes', () => {
    let model: Notes;
    // let result: string;
    let mockItem = { id: 1, test: 'test' };
    const mockFind = jest.fn();
    const mockFindOne = jest.fn();
    const mockInsertOne = jest.fn();
    const mockfindOneAndUpdate = jest.fn();
    const mockfindOneAndDelete = jest.fn();

    beforeEach(() => {
        // result = JSON.stringify([mockItem]) as string;
        (mongoConnect as jest.Mock).mockReturnValue({
            connect: { close: jest.fn() },
            collection: {
                find: mockFind,
                findOne: mockFindOne,
                insertOne: mockInsertOne,
                findOneAndUpdate: mockfindOneAndUpdate,
                findOneAndDelete: mockfindOneAndDelete,
            },
        });
        model = new Notes('test-db');
    });

    describe('', () => {
        test('An object should be created', () => {
            const model = new Notes('', '', true);
            expect(model).toBeTruthy();
        });
    });

    describe('When method findAll is called', () => {
        test('Then collection.find() should be called', async () => {
            mockFind.mockReturnValue({
                toArray: jest.fn().mockResolvedValue({}),
            });
            await model.findAll();
            expect(mockFind).toHaveBeenCalled();
        });
    });

    describe('When method find is called', () => {
        test('Then an item should be found', async () => {
            mockFindOne.mockReturnValue({});
            const manolo = await model.find('62b4a15fd92e0b7fa4828341');
            expect(mockFindOne).toHaveBeenCalledTimes(1);
            expect(manolo).toBeTruthy();
        });
    });
    describe('When method find is called with a non valid id', () => {
        test('Then it should return undefined', async () => {
            mockFindOne.mockReturnValue(null);
            const roberto = await model.find('62b4a15fd92e0b7fa4828341');

            expect(roberto).toBeUndefined();
        });
    });

    describe('When method create is called', () => {
        test('Then an item should be created', async () => {
            await model.create({ content: '' });
            expect(mockInsertOne).toHaveBeenCalledWith({ content: '' });
        });
    });

    describe('When method update is called', () => {
        test('Then an item should be updated', async () => {
            await model.update('62b4a15fd92e0b7fa4828341', { content: '' });
            expect(mockfindOneAndUpdate).toHaveBeenCalledTimes(1);
        });
    });

    describe('When method delete is called with a valid id', () => {
        test('Then an item should be deleted', async () => {
            mockfindOneAndDelete.mockReturnValue({
                value: {},
            });
            const paco = await model.delete('62b4a15fd92e0b7fa4828341');
            // const result = await model.delete('1');
            // expect(result.status).toBe(202);
            expect(mockfindOneAndDelete).toHaveBeenCalled();
            expect(paco.status).toBe(202);
        });
    });

    describe('When method delete is called with a not valid id', () => {
        test('Then an item should not be  deleted', async () => {
            mockfindOneAndDelete.mockReturnValue({
                value: false,
            });
            const pepe = await model.delete('62b4a15fd92e0b7fa4828341');
            expect(mockfindOneAndDelete).toHaveBeenCalled();
            expect(pepe.status).toBe(404);
        });
    });
});
