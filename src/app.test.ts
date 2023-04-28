// const request = require('supertest')('https://urlbae.com')
import request from 'supertest'
const base_url = 'https://urlbae.com';
const token = 'Bearer 1443d1596f0b66b5f96c62a2c778234f';
const randomName = Math.random().toString(36).substring(3, 10);
const randomSlug = Math.random().toString(36).substring(2, 7);
const randomDescription = Math.random().toString(36).substring(4, 14);

describe("Campaigns", function () {
    describe("CAM-001 Verify that user can create a campaign", function () {
        function createCampaign() {
            return request(base_url)
                .post("/api/campaign/add")
                .set('Authorization', token)
                .send({
                    "name": randomName,
                    "slug": randomSlug,
                    "public": true
                });
        }
        const response1 = createCampaign();
        afterAll(async function () {
            const campaign_id = (await response1).body.id;
            await request(base_url)
                .delete("/api/campaign/" + campaign_id + "/delete")
                .set('Authorization', token);
        })
        test("Status code is 201", async function () {
            console.log((await response1).body);
            expect((await response1).status).toEqual(200);
        });
        test('"error" equals 0', async function () {
            expect((await response1).body.error).toEqual(0);
        });
        test('"campaign" equals ' + randomName, async function () {
            expect((await response1).body.campaign.toLowerCase()).toEqual(randomName);
        });
        test('"public" equals true', async function () {
            expect((await response1).body.public).toEqual(true);
        });
        test('"rotator" is https://urlbae.com/r/' + randomSlug, async function () {
            expect((await response1).body.rotator).toEqual("https://urlbae.com/r/" + randomSlug);
        });
        test('Response body has total 6 properties: error, id, campaign name, public, rotator, list', async function () {
            expect((await response1).body).toHaveProperty("error");
            expect((await response1).body).toHaveProperty("id");
            expect((await response1).body).toHaveProperty("campaign");
        });
    });
});

describe.only("Channels", function () {
    async function createChannel() {
        const response = await request(base_url)
            .post("/api/channel/add")
            .set('Authorization', token)
            .send({
                "name": randomName,
                "description": randomDescription,
                "color": "#000000",
                "starred": true
            });
        const channel_id = response.body.id;
        console.log(response);
        return channel_id;
    }
    describe("CHA-001 Verify that user can change total details of an existent channel", function () {
        const channel_id = createChannel();
        function updateChannel() {
            return request(base_url)
                .put("/api/channel/" + channel_id + "/update")
                .set('Authorization', token)
                .send({
                    "name": "changed_name_1",
                    "description": "changed_description_1",
                    "color": "#FFFFFF",
                    "starred": false
                });
        }
        const response = updateChannel();
        afterAll(async function () {
            await request(base_url)
                .delete("/api/channel/" + channel_id + "/delete")
                .set('Authorization', token);
        })
        test("Status code is 200", async function () {
            console.log((await response).body);
            expect((await response).status).toEqual(200);
        });
        test('"error" equals 0', async function () {
            expect((await response).body.error).toEqual(0);
        });
    });
});
    // test("It should response the GET method", async function () {
    //     const response = await request(base_url)
    //         .get("/api/campaigns")
    //         .set('Authorization', 'Bearer 1443d1596f0b66b5f96c62a2c778234f');
    //     expect(response.status).toEqual(200);
    //     expect(response.body.error).toEqual(0);
    //     console.log(response.body);
    // });

    // test('', async function () {
    //     const response = await request(base_url)
    //         .post("/api/campaign/add")
    //         .set('Authorization', token)
    //         .send({
    //             "name": randomName,
    //             "slug": randomSlug,
    //             "public": true
    //         });
    //     console.log(response.body);
    //     expect(response.status).toEqual(200);
    //     expect(response.body.error).toEqual(0);
    // })
