import request from 'supertest';
import { BASE_URL, TOKEN } from '../helpers/constant'
import { generateRandomString } from '../helpers/common'
import { createCampaign, deleteManyCampaigns } from '../helpers/api.helper'
import { errorMessage } from '../helpers/enum'

describe('POST /api/campaign/add', function () {
    var campaign_id: string[] = [];

    test('CAM-001 Verify that user can create a campaign', async function () {
        const randomName = generateRandomString();
        const randomSlug = generateRandomString();
        // create a new campaign for testing
        const response = await request(BASE_URL)
            .post("/api/campaign/add")
            .set('Authorization', `${TOKEN}`)
            .send({
                "name": randomName,
                "slug": randomSlug,
                "public": true
            });
        const body = response.body;
        // add id into array for deleting later
        campaign_id.push(response.body.id);
        expect(response.status).toEqual(200);
        expect(body.error).toEqual(0);
        expect(body.campaign.toLowerCase()).toEqual(randomName);
        expect(body.public).toEqual(true);
        expect(body.rotator).toEqual(BASE_URL + "/r/" + randomSlug);
        expect(body.list).toContain(BASE_URL + "/u/");
        expect(typeof body.id).toBe('number');
    });

    test('CAM-011 Verify that user cannot create a campaign with existent "name" in Body', async function () {
        const randomName = generateRandomString();
        const randomSlug = generateRandomString();
        // create a new campaign for testing
        const response_1 = await createCampaign(randomName, randomSlug, true);
        // get existent name of created campaign
        const existent_name = response_1.body.campaign;
        // create another campaign with existent name above
        const response_2 = await request(BASE_URL)
            .post("/api/campaign/add")
            .set('Authorization', `${TOKEN}`)
            .send({
                "name": existent_name,
                "slug": randomSlug,
                "public": true
            });
        // add id into array for deleting later
        campaign_id.push(response_1.body.id)
        expect(response_2.status).toEqual(400);
        expect(response_2.body.error).toEqual(1);
        expect(response_2.body.message).toEqual(errorMessage.campaign);
    });

    afterAll(async function () {
        // delete campaign after test
        await deleteManyCampaigns(campaign_id);
    })
});
