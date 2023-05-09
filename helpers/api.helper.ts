import request from 'supertest';
import { BASE_URL, TOKEN } from './constant'
import { generateRandomString, generateRandomPixelType } from '../helpers/common'

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
    for (let i = 0; i < array.length; i++) {
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
    for (let i = 0; i < array.length; i++) {
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

export async function createManyPixels(recordSize: number, array: string[]) {
    for (let i = 0; i < recordSize; i++) {
        let randomType = generateRandomPixelType();
        let randomName = generateRandomString();
        let randomTag = generateRandomString();
        const newPixel = await createPixel(randomType, randomName, randomTag);
        // add id into array for deleting later
        array.push(newPixel.body.id);
    };
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
    for (let i = 0; i < array.length; i++) {
        await request(BASE_URL)
            .delete("/api/pixel/" + array[i] + "/delete")
            .set('Authorization', `${TOKEN}`);
    }
}
