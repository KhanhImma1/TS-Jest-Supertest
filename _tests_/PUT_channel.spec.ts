import { generateRandomString } from '../_helpers_/common'
import { createChannel, updateChannel, deleteChannel } from '../_helpers_/api.helper'

describe('PUT /api/channel/:id/update', function () {
    var channel_id: number[] = [];

    test('CHA-001 Verify that user can change total details of an existent channel', async function () {
        const randomName = generateRandomString();
        const randomDescription = generateRandomString();
        const randomName_2 = generateRandomString();
        const randomDescription_2 = generateRandomString()
        // create new channel
        const createdResponse = await createChannel(randomName, randomDescription, "#000000", false);
        // console.log(createdResponse.body);
        channel_id.push(createdResponse.body.id);
        // update channel created with id
        const updatedResponse = await updateChannel(createdResponse.body.id, randomName_2, randomDescription_2, "#FFFFFF", true);
        // console.log(updatedResponse.body)
        expect(updatedResponse.status).toEqual(200);
        expect(updatedResponse.body.error).toEqual(0);
        expect(updatedResponse.body.name.toLowerCase()).toEqual(randomName_2);
        expect(updatedResponse.body.description).toEqual(randomDescription_2);
        expect(updatedResponse.body.color).toEqual("#FFFFFF");
        expect(updatedResponse.body.starred).toEqual(true);
        expect(updatedResponse.body).toHaveProperty('id');
    });

    test('CHA-012 Verify that user cannot change details of an existent channel with existent "name" in Body', async function () {
        const randomName = generateRandomString();
        const randomDescription = generateRandomString();
        const randomName_2 = generateRandomString();
        const randomDescription_2 = generateRandomString()
        // created 2 new channels
        const newChannel_1 = await createChannel(randomName, randomDescription, "#000000", true);
        const channel_id_1 = newChannel_1.body.id;
        const newChannel_2 = await createChannel(randomName_2, randomDescription_2, "#000000", false);
        const channel_id_2 = newChannel_2.body.id;
        const channel_name_2 = newChannel_2.body.name;
        channel_id.push(channel_id_1, channel_id_2);
        // update channel_1 with existent name of channel_2
        const updatedResponse = await updateChannel(channel_id_1, channel_name_2, randomDescription_2, "#000000", true);
        expect(updatedResponse.status).toEqual(400);
        expect(updatedResponse.body.error).toEqual(1);
        expect(updatedResponse.body.message).toEqual("You already have a channel with this name.");
    });

    afterEach(async function () {
        // delete channel after test
        for (let i = 0; i < channel_id.length; i++) {
            await deleteChannel(channel_id[i]);
        }
    })
});