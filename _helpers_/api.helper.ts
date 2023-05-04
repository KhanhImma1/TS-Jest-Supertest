import request from 'supertest';
import { base_url, token, randomName, randomSlug } from '../_helpers_/const'

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