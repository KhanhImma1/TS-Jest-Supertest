import request from 'supertest';
import { BASE_URL, TOKEN } from '../helpers/constant'
import { createManyPixels, deleteManyPixels } from '../helpers/api.helper'
import { DEFAULT_TIMEOUT } from '../helpers/constant'

describe('GET /api/pixels', function () {
    let pixelIdList: string[] = []

    beforeAll(async function () {
        // create new pixels for testing
        await createManyPixels(4, pixelIdList);
    })

    test('PIX-001 Verify that user can get list of total pixels', async function () {
        // get list of pixels
        const response = await request(BASE_URL)
            .get("/api/pixels")
            .set('Authorization', `${TOKEN}`);
        expect(response.status).toEqual(200);
        const data = response.body.data;
        expect(response.body.error).toEqual(0);
        expect(data.perpage).toEqual(15);
        expect(data.currentpage).toEqual(1);
        expect(typeof data.result).toBe('number');
        expect(typeof data.nextpage).toBe('object');
        expect(typeof data.maxpage).toBe('number')
        expect(typeof data.pixels).toBe('object');
        expect(typeof data.pixels[0].id).toBe('string');
        expect(typeof data.pixels[0].type).toBe('string');
        expect(typeof data.pixels[0].name).toBe('string');
        expect(typeof data.pixels[0].tag).toBe('string');
        expect(typeof data.pixels[0].date).toBe('string');
    },
        DEFAULT_TIMEOUT
    )

    test('PIX-002 Verify that user can get list of pixels with "limit" in param', async function () {
        const limit = 3;
        // get list of pixels
        const response = await request(BASE_URL)
            .get("/api/pixels")
            .set('Authorization', `${TOKEN}`)
            .query({
                limit: limit
            });
        expect(response.status).toEqual(200);
        const data = response.body.data;
        expect(response.body.error).toEqual(0);
        expect(data.perpage).toEqual(limit);
        expect(data.currentpage).toEqual(1);
        expect(typeof data.result).toBe('number');
        expect(typeof data.nextpage).toBe('number');
        expect(typeof data.maxpage).toBe('number');
    },
        DEFAULT_TIMEOUT // need more time to create records
    )

    afterAll(async function () {
        // delete pixels after testing
        await deleteManyPixels(pixelIdList);
        pixelIdList = [];
    })
})
