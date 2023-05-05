import request from 'supertest';
import { base_url, token, randomName, randomSlug, randomDescription } from '../_helpers_/const'

export function createCampaign(name: string, slug: string, pub: boolean) {
    return request(base_url)
        .post("/api/campaign/add")
        .set('Authorization', token)
        .send({
            "name": name,
            "slug": slug,
            "public": pub
        });
}

export async function deleteCampaign(id: number) {
    const response = await request(base_url)
        .delete("/api/campaign/" + id + "/delete")
        .set('Authorization', token);
    if (response.body.error === 0) {
        console.log('successfull delete id ' + id);
    } else {
        console.log('failed delete');
    }
}

export function createChannel(name: string, des: string, color: string, star: boolean) {
    return request(base_url)
        .post("/api/channel/add")
        .set('Authorization', token)
        .send({
            "name": name,
            "description": des,
            "color": color,
            "starred": star
        });
}

export async function deleteChannel(id: number) {
    const response = await request(base_url)
        .delete("/api/channel/" + id + "/delete")
        .set('Authorization', token);
    if (response.body.error === 0) {
        console.log('successfull delete campaign id ' + id);
    } else {
        console.log('failed delete campaign');
    }
}