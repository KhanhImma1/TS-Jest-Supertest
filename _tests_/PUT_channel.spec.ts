import { randomName, randomDescription, randomString1, randomString2 } from '../_helpers_/const'
import { createChannel, updateChannel, deleteChannel } from '../_helpers_/api.helper'

var channel_id: number[] = [];
describe('PUT /api/channel/:id/update', function () {
    test('CHA-001 Verify that user can change total details of an existent channel', async function () {
        // create new channel
        const createdResponse = await createChannel(randomName, randomDescription, "#000000", false);
        // console.log(createdResponse.body);
        channel_id.push(createdResponse.body.id);
        // update channel created with id
        const updatedResponse = await updateChannel(createdResponse.body.id, randomString1, randomString2, "#FFFFFF", true);
        // console.log(updatedResponse.body)
        expect(updatedResponse.status).toEqual(200);
        expect(updatedResponse.body.error).toEqual(0);
        expect(updatedResponse.body.name.toLowerCase()).toEqual(randomString1);
        expect(updatedResponse.body.description).toEqual(randomString2);
        expect(updatedResponse.body.color).toEqual("#FFFFFF");
        expect(updatedResponse.body.starred).toEqual(true);
        expect(updatedResponse.body).toHaveProperty('id');
    });

    test('CHA-012 Verify that user cannot change details of an existent channel with existent "name" in Body', async function () {
        // created 2 new channels
        const newChannel_1 = await createChannel(randomName, randomDescription, "#000000", true);
        const channel_id_1 = newChannel_1.body.id;
        const newChannel_2 = await createChannel(randomString1, randomString2, "#000000", false);
        const channel_id_2 = newChannel_2.body.id;
        const channel_name_2 = newChannel_2.body.name;
        channel_id.push(channel_id_1, channel_id_2);
        // console.log(newChannel_1.body);
        // console.log(newChannel_2.body);
        // update channel_1 with existent name of channel_2
        const updatedResponse = await updateChannel(channel_id_1, channel_name_2, randomString2, "#000000", true);
        // console.log(updatedResponse.body);
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