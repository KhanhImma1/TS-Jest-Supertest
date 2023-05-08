import { generateRandomString } from '../_helpers_/common'
import { createCampaign, deleteCampaign } from '../_helpers_/api.helper'

describe('POST /api/campaign/add', function () {
    var campaign_id: number[] = [];

    test('CAM-001 Verify that user can create a campaign', async function () {
        const randomName = generateRandomString();
        const randomSlug = generateRandomString();
        const response = await createCampaign(randomName, randomSlug, true);
        const body = response.body;
        // add id into array for deleting after
        campaign_id.push(response.body.id);
        expect(response.status).toEqual(200);
        expect(body.error).toEqual(0);
        expect(body.campaign.toLowerCase()).toEqual(randomName);
        expect(body.public).toEqual(true);
        expect(body.rotator).toEqual("https://urlbae.com/r/" + randomSlug);
        expect(body.list).toContain("https://urlbae.com/u/");
        expect(body).toHaveProperty("id");
    });

    test('CAM-011 Verify that user cannot create a campaign with existent "name" in Body', async function () {
        const randomName = generateRandomString();
        const randomSlug = generateRandomString();
        // get existent name of created campaign
        const response_1 = await createCampaign(randomName, randomSlug, true);
        const existent_name = response_1.body.campaign;
        // create the second campaign with existent name
        const response_2 = await createCampaign(existent_name, randomSlug, true);
        // add id into array for deleting after
        campaign_id.push(response_1.body.id, response_2.body.id)
        expect(response_2.status).toEqual(400);
        expect(response_2.body.error).toEqual(1);
        expect(response_2.body.message).toEqual("You already have a campaign with that name.");
    });

    afterEach(async function () {
        // delete campaign after test
        for (let i = 0; i < campaign_id.length; i++) {
            await deleteCampaign(campaign_id[i]);
        }
    })
});
