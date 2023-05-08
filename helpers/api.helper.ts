import request from 'supertest';
import { BASE_URL, TOKEN } from './constant'

export function createCampaign(name: string, slug: string, pub: boolean) {
    return request(BASE_URL)
        .post("/api/campaign/add")
        .set('Authorization', `${TOKEN}`)
        .send({
            "name": name,
            "slug": slug,
            "public": pub
        });
}

export async function deleteCampaign(id: number) {
    const response = await request(BASE_URL)
        .delete("/api/campaign/" + id + "/delete")
        .set('Authorization', `${TOKEN}`);
    if (response.body.error === 0) {
        console.log('successfull delete campaign id ' + id);
    } else {
        console.log('failed delete campaign id ' + id);
    }
}

export function createChannel(name: string, des: string, color: string, star: boolean) {
    return request(BASE_URL)
        .post("/api/channel/add")
        .set('Authorization', `${TOKEN}`)
        .send({
            "name": name,
            "description": des,
            "color": color,
            "starred": star
        });
}

export function updateChannel(id: number, name: string, des: string, color: string, star: boolean) {
    return request(BASE_URL)
        .put("/api/channel/" + id + "/update")
        .set('Authorization', `${TOKEN}`)
        .send({
            "name": name,
            "description": des,
            "color": color,
            "starred": star
        });
}

export async function deleteChannel(id: number) {
    const response = await request(BASE_URL)
        .delete("/api/channel/" + id + "/delete")
        .set('Authorization', `${TOKEN}`);
    if (response.body.error === 0) {
        console.log('successfull delete channel id ' + id);
    } else {
        console.log('failed delete channel id ' + id);
    }
}

export function createPixel(type: string, name: string, tag: string) {
    return request(BASE_URL)
        .post("/api/pixel/add")
        .set('Authorization', `${TOKEN}`)
        .send({
            "type": type,
            "name": name,
            "tag": tag
        });
}

export function listPixels(limits?: number, pages?: number) {
    return request(BASE_URL)
        .get("/api/pixels")
        .set('Authorization', `${TOKEN}`)
        .query({
            limit: limits,
            page: pages
        })
}

export async function deletePixel(id: string) {
    const response = await request(BASE_URL)
        .delete("/api/pixel/" + id + "/delete")
        .set('Authorization', `${TOKEN}`);
    if (response.body.error === 0) {
        console.log('successfull delete pixel id ' + id);
    } else {
        console.log('failed delete pixel id ' + id);
    }
}
