import request from 'supertest';
import { BASE_URL, TOKEN } from '../helpers/constant'
import { generateRandomString } from '../helpers/common'
import { createChannel, deleteManyChannels } from '../helpers/api.helper'
import { errorMessage } from '../helpers/enum'

describe('PUT /api/channel/:id/update', function () {
    let channelIdList: string[] = [];
    let randomName1: string;
    let randomName2: string;
    let randomDescription1: string;
    let randomDescription2: string;
    let channelId1: string;
    let channelId2: string;
    let channelName2: string;

    beforeEach(async function () {
        randomName1 = generateRandomString();
        randomName2 = generateRandomString();
        randomDescription1 = generateRandomString();
        randomDescription2 = generateRandomString();
        // created 2 new channels for testing
        const newChannel1 = await createChannel(randomName1, randomDescription1, "#000000", true);
        const newChannel2 = await createChannel(randomName2, randomDescription2, "#000000", false);
        channelId1 = newChannel1.body.id;
        channelId2 = newChannel2.body.id;
        channelName2 = newChannel2.body.name;
        // add id into array for deleting later
        channelIdList.push(channelId1, channelId2);
    })

    test('CHA-001 Verify that user can change total details of an existent channel', async function () {
        // update channel that has just created
        const updatedResponse = await request(BASE_URL)
            .put("/api/channel/" + channelId1 + "/update")
            .set('Authorization', `${TOKEN}`)
            .send({
                "name": randomName2,
                "description": randomDescription2,
                "color": "#FFFFFF",
                "starred": true
            });

        expect(updatedResponse.status).toEqual(200);
        const body = updatedResponse.body;
        expect(body.error).toEqual(0);
        expect(body.name.toLowerCase()).toEqual(randomName2);
        expect(body.description).toEqual(randomDescription2);
        expect(body.color).toEqual("#FFFFFF");
        expect(body.starred).toEqual(true);
        expect(typeof body.id).toBe('number');
    });

    test('CHA-012 Verify that user cannot rename an existent channel with existent "name" in Body', async function () {
        // update channel_1 with existent name of channel_2
        const updatedResponse = await request(BASE_URL)
            .put("/api/channel/" + channelId1 + "/update")
            .set('Authorization', `${TOKEN}`)
            .send({
                "name": channelName2,
                "description": randomDescription2,
                "color": "#000000",
                "starred": true
            });

        expect(updatedResponse.status).toEqual(400);
        expect(updatedResponse.body.error).toEqual(1);
        expect(updatedResponse.body.message).toEqual(errorMessage.channel);
    });

    afterAll(async function () {
        // delete channel after test
        await deleteManyChannels(channelIdList);
        channelIdList = [];
    })
});
