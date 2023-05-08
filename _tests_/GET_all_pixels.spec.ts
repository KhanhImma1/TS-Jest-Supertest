import { generateRandomString, generateRandomType } from '../_helpers_/common'
import { createPixel, listPixels, deletePixel } from '../_helpers_/api.helper'
import { DEFAULT_TIMEOUT } from '_helpers_/const'

describe('GET /api/pixels', function () {
    var pixel_id: number[] = []

    test('PIX-001 Verify that user can get list of total pixels', async function () {
        const record_size = 2;
        for (let i = 0; i < record_size; i++) {
            var randomType = generateRandomType();
            var randomName = generateRandomString();
            var randomTag = generateRandomString();
            const newPixel = await createPixel(randomType, randomName, randomTag);
            console.log(newPixel.body);
            pixel_id.push(newPixel.body.id);
        };
        const response = await listPixels();
        expect(response.status).toEqual(200);
        expect(response.body.error).toEqual(0);
        expect(response.body.data.result).toEqual(record_size);
        expect(response.body.data.perpage).toEqual(15);
        expect(response.body.data.currentpage).toEqual(1);
        expect(response.body.data.nextpage).toEqual(null);
        expect(response.body.data.maxpage).toEqual(1);
        expect(response.body.data).toHaveProperty('pixels');
        expect(response.body.data.pixels[0]).toHaveProperty('id');
        expect(response.body.data.pixels[0]).toHaveProperty('type');
        expect(response.body.data.pixels[0]).toHaveProperty('name');
        expect(response.body.data.pixels[0]).toHaveProperty('tag');
        expect(response.body.data.pixels[0]).toHaveProperty('date');
    })

    test('PIX-002 Verify that user can get list of pixels with "limit" in param', async function () {
        const record_size = 4;
        const limits = 3;
        for (let i = 0; i < record_size; i++) {
            var randomType = generateRandomType();
            var randomName = generateRandomString();
            var randomTag = generateRandomString();
            const newPixel = await createPixel(randomType, randomName, randomTag);
            console.log(newPixel.body);
            pixel_id.push(newPixel.body.id);
        };
        const response = await listPixels(limits);
        expect(response.status).toEqual(200);
        expect(response.body.error).toEqual(0);
        expect(response.body.data.result).toEqual(record_size);
        expect(response.body.data.perpage).toEqual(limits);
        expect(response.body.data.currentpage).toEqual(1);
        expect(response.body.data.nextpage).toEqual(2);
        expect(response.body.data.maxpage).toEqual(2);
    },
        DEFAULT_TIMEOUT
    )

    afterEach(async function () {
        for (let i = 0; i < pixel_id.length; i++) {
            await deletePixel(pixel_id[i]);
        }
    })
})
