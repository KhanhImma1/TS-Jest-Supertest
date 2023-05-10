import request from 'supertest';
import { BASE_URL, TOKEN } from '../helpers/constant'
import { generateRandomString } from '../helpers/common'
import { createCampaign, deleteManyCampaigns } from '../helpers/api.helper'
import { errorMessage } from '../helpers/enum'

describe('POST /api/campaign/add', function () {
    let campaignIdList: string[] = [];
    let randomName: string;
    let randomSlug: string;

    beforeEach(async function () {
        randomName = generateRandomString();
        randomSlug = generateRandomString();
    })

    test('CAM-001 Verify that user can create a campaign', async function () {

        // create a new campaign for testing
        const response = await request(BASE_URL)
            .post("/api/campaign/add")
            .set('Authorization', `${TOKEN}`)
            .send({
                "name": randomName,
                "slug": randomSlug,
                "public": true
            });
        expect(response.status).toEqual(200);
        // add id into array for deleting later
        campaignIdList.push(response.body.id);
        const body = response.body;
        expect(body.error).toEqual(0);
        expect(body.campaign.toLowerCase()).toEqual(randomName);
        expect(body.public).toEqual(true);
        expect(body.rotator).toEqual(BASE_URL + "/r/" + randomSlug);
        expect(body.list).toContain(BASE_URL + "/u/");
        expect(typeof body.id).toBe('number');
    });

    test('CAM-011 Verify that user cannot create a campaign with existent "name" in Body', async function () {
        // create a new campaign for testing
        const response1 = await createCampaign(randomName, randomSlug, true);
        // add id into array for deleting later
        campaignIdList.push(response1.body.id)
        // get existent name of created campaign
        const campaignName1 = response1.body.campaign;
        // create another campaign with existent name above
        const response2 = await request(BASE_URL)
            .post("/api/campaign/add")
            .set('Authorization', `${TOKEN}`)
            .send({
                "name": campaignName1,
                "slug": randomSlug,
                "public": true
            });
        expect(response2.status).toEqual(400);
        expect(response2.body.error).toEqual(1);
        expect(response2.body.message).toEqual(errorMessage.campaign);
    });

    afterAll(async function () {
        // delete campaign after test
        await deleteManyCampaigns(campaignIdList);
        campaignIdList = [];
    })
});
