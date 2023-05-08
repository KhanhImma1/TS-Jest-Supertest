import { generateRandomString, generateRandomPixelType } from '../_helpers_/common'
import { createPixel, listPixels, deletePixel } from '../_helpers_/api.helper'
import { DEFAULT_TIMEOUT } from '../_helpers_/const'

describe('GET /api/pixels', function () {
    var pixel_id: number[] = []

    test('PIX-001 Verify that user can get list of total pixels', async function () {
        const record_size = 2;
        // create new pixels for testing
        for (let i = 0; i < record_size; i++) {
            var randomType = generateRandomPixelType();
            var randomName = generateRandomString();
            var randomTag = generateRandomString();
            const newPixel = await createPixel(randomType, randomName, randomTag);
            // add id into array for deleting later
            pixel_id.push(newPixel.body.id);
        };
        // get list of pixels
        const response = await listPixels();
        const data = response.body.data;
        expect(response.status).toEqual(200);
        expect(response.body.error).toEqual(0);
        expect(data.result).toEqual(record_size);
        expect(data.perpage).toEqual(15);
        expect(data.currentpage).toEqual(1);
        expect(data.nextpage).toEqual(null);
        expect(data.maxpage).toEqual(1);
        expect(data).toHaveProperty('pixels');
        expect(data.pixels[0]).toHaveProperty('id');
        expect(data.pixels[0]).toHaveProperty('type');
        expect(data.pixels[0]).toHaveProperty('name');
        expect(data.pixels[0]).toHaveProperty('tag');
        expect(data.pixels[0]).toHaveProperty('date');
    })

    test('PIX-002 Verify that user can get list of pixels with "limit" in param', async function () {
        const record_size = 4;
        const limits = 3;
        // create new pixels for testing
        for (let i = 0; i < record_size; i++) {
            var randomType = generateRandomPixelType();
            var randomName = generateRandomString();
            var randomTag = generateRandomString();
            const newPixel = await createPixel(randomType, randomName, randomTag);
            // add id into array for deleting later
            pixel_id.push(newPixel.body.id);
        };
        // get list of pixels
        const response = await listPixels(limits);
        const data = response.body.data;
        expect(response.status).toEqual(200);
        expect(response.body.error).toEqual(0);
        expect(data.result).toEqual(record_size);
        expect(data.perpage).toEqual(limits);
        expect(data.currentpage).toEqual(1);
        expect(data.nextpage).toEqual(2);
        expect(data.maxpage).toEqual(2);
    },
        DEFAULT_TIMEOUT // need more time to create records
    )

    afterEach(async function () {
        // delete pixels after testing
        for (let i = 0; i < pixel_id.length; i++) {
            await deletePixel(pixel_id[i]);
        }
    })
})
