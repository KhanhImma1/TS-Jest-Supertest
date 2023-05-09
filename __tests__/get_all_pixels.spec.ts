import request from 'supertest';
import { BASE_URL, TOKEN } from '../helpers/constant'
import { generateRandomString, generateRandomPixelType } from '../helpers/common'
import { createPixel, deleteManyPixels } from '../helpers/api.helper'
import { DEFAULT_TIMEOUT } from '../helpers/constant'

describe('GET /api/pixels', function () {
    var pixel_id: string[] = []

    test('PIX-001 Verify that user can get list of total pixels', async function () {
        const record_size = 2;
        // create new pixels for testing
        for (let i = 0; i < record_size; i++) {
            let randomType = generateRandomPixelType();
            let randomName = generateRandomString();
            let randomTag = generateRandomString();
            const newPixel = await createPixel(randomType, randomName, randomTag);
            // add id into array for deleting later
            pixel_id.push(newPixel.body.id);
        };
        // get list of pixels
        const response = await request(BASE_URL)
            .get("/api/pixels")
            .set('Authorization', `${TOKEN}`);
        const data = response.body.data;
        expect(response.status).toEqual(200);
        expect(response.body.error).toEqual(0);
        expect(data.result).toEqual(record_size);
        expect(data.perpage).toEqual(15);
        expect(data.currentpage).toEqual(1);
        expect(data.nextpage).toEqual(null);
        expect(data.maxpage).toEqual(1);
        expect(data).toHaveProperty('pixels');
        expect(typeof data.pixels[0].id).toBe('string');
        expect(typeof data.pixels[0].type).toBe('string');
        expect(typeof data.pixels[0].name).toBe('string');
        expect(typeof data.pixels[0].tag).toBe('string');
        expect(typeof data.pixels[0].date).toBe('string');
    },
        DEFAULT_TIMEOUT
    )

    test('PIX-002 Verify that user can get list of pixels with "limit" in param', async function () {
        const record_size = 4;
        const limits = 3;
        // create new pixels for testing
        for (let i = 0; i < record_size; i++) {
            let randomType = generateRandomPixelType();
            let randomName = generateRandomString();
            let randomTag = generateRandomString();
            const newPixel = await createPixel(randomType, randomName, randomTag);
            // add id into array for deleting later
            pixel_id.push(newPixel.body.id);
        };
        // get list of pixels
        const response = await request(BASE_URL)
            .get("/api/pixels")
            .set('Authorization', `${TOKEN}`)
            .query({
                limit: limits
            });
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
        await deleteManyPixels(pixel_id);
    })
})
