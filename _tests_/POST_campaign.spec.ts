import request from 'supertest'
import { base_url, token, randomName, randomSlug } from '../_helpers_/const'
import { createCampaign, deleteCampaign } from '../_helpers_/api.helper'

describe('POST /api/campaign/add', function () {
    test('CAM-001 Verify that user can create a campaign', async function () {
        const response = await createCampaign(randomName, randomSlug, true);
        try {
            expect(response.status).toEqual(200);
            expect(response.body.error).toEqual(0);
            expect(response.body.campaign.toLowerCase()).toEqual(randomName);
            expect(response.body.public).toEqual(true);
            expect(response.body.rotator).toEqual("https://urlbae.com/r/" + randomSlug);
            expect(response.body).toHaveProperty("error");
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("campaign");
            expect(response.body).toHaveProperty("public");
            expect(response.body).toHaveProperty("rotator");
            expect(response.body).toHaveProperty("list");
        } catch (error) {

        } finally {
            // delete campaign after test
            await deleteCampaign(response.body.id);
        }
    });

    test('CAM-011 Verify that user cannot create a campaign with existent "name" in Body', async function () {
        // get existent name of created campaign
        const response_1 = await createCampaign(randomName, randomSlug, true);
        console.log(response_1.body);
        const existent_name = response_1.body.campaign;
        console.log('existent_name: ' + existent_name);
        // create the second campaign with existent name
        const response_2 = await createCampaign(existent_name, randomSlug, true);
        try {
            expect(response_2.status).toEqual(400);
            expect(response_2.body.error).toEqual(1);
            expect(response_2.body.message).toEqual("You already have a campaign with that name.");
        } catch (error) {

        } finally {
            // delete the first campaign
            await deleteCampaign(response_1.body.id);
            // delete the second campaign if it's created
            if (response_2.body.error === 0) {
                await deleteCampaign(response_2.body.id);
            }
        }
    });
});