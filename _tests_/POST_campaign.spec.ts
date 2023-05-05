import { randomName, randomSlug } from '../_helpers_/const'
import { createCampaign, deleteCampaign } from '../_helpers_/api.helper'

var campaign_id: number[] = [];
describe('POST /api/campaign/add', function () {
    test('CAM-001 Verify that user can create a campaign', async function () {
        const response = await createCampaign(randomName, randomSlug, true);
        // add id into array for deleting after
        campaign_id.push(response.body.id);
        expect(response.status).toEqual(200);
        expect(response.body.error).toEqual(0);
        expect(response.body.campaign.toLowerCase()).toEqual(randomName);
        expect(response.body.public).toEqual(true);
        expect(response.body.rotator).toEqual("https://urlbae.com/r/" + randomSlug);
        expect(response.body.list).toContain("https://urlbae.com/u/");
        expect(response.body).toHaveProperty("id");
    });

    test('CAM-011 Verify that user cannot create a campaign with existent "name" in Body', async function () {
        // get existent name of created campaign
        const response_1 = await createCampaign(randomName, randomSlug, true);
        const existent_name = response_1.body.campaign;
        // console.log(response_1.body);
        // console.log('existent_name: ' + existent_name);
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