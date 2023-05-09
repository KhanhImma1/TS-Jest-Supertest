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

export async function deleteManyCampaigns(array: string[]) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        await request(BASE_URL)
            .delete("/api/campaign/" + array[i] + "/delete")
            .set('Authorization', `${TOKEN}`);
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

export async function deleteManyChannels(array: string[]) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        await request(BASE_URL)
            .delete("/api/channel/" + array[i] + "/delete")
            .set('Authorization', `${TOKEN}`);
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

export async function deleteManyPixels(array: string[]) {
    const length = array.length
    for (let i = 0; i < length; i++) {
        await request(BASE_URL)
            .delete("/api/pixel/" + `${array.pop()}` + "/delete")
            .set('Authorization', `${TOKEN}`);
    }
}
