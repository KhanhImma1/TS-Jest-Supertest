import request from 'supertest';
import { base_url, token } from '../_helpers_/const'

export function createCampaign(name: string, slug: string, pub: boolean) {
    return request(`${base_url}`)
        .post("/api/campaign/add")
        .set('Authorization', `${token}`)
        .send({
            "name": name,
            "slug": slug,
            "public": pub
        });
}

export async function deleteCampaign(id: number) {
    const response = await request(`${base_url}`)
        .delete("/api/campaign/" + id + "/delete")
        .set('Authorization', `${token}`);
    if (response.body.error === 0) {
        console.log('successfull delete campaign id ' + id);
    } else {
        console.log('failed delete campaign id ' + id);
    }
}

export function createChannel(name: string, des: string, color: string, star: boolean) {
    return request(`${base_url}`)
        .post("/api/channel/add")
        .set('Authorization', `${token}`)
        .send({
            "name": name,
            "description": des,
            "color": color,
            "starred": star
        });
}

export function updateChannel(id: number, name: string, des: string, color: string, star: boolean) {
    return request(`${base_url}`)
        .put("/api/channel/" + id + "/update")
        .set('Authorization', `${token}`)
        .send({
            "name": name,
            "description": des,
            "color": color,
            "starred": star
        });
}

export async function deleteChannel(id: number) {
    const response = await request(`${base_url}`)
        .delete("/api/channel/" + id + "/delete")
        .set('Authorization', `${token}`);
    if (response.body.error === 0) {
        console.log('successfull delete channel id ' + id);
    } else {
        console.log('failed delete channel id ' + id);
    }
}

export function createPixel(type: string, name: string, tag: string) {
    return request(`${base_url}`)
        .post("/api/pixel/add")
        .set('Authorization', `${token}`)
        .send({
            "type": type,
            "name": name,
            "tag": tag
        });
}

export function listPixels(limits?: number, pages?: number) {
    return request(`${base_url}`)
        .get("/api/pixels")
        .set('Authorization', `${token}`)
        .query({
            limit: limits,
            page: pages
        })
}

export async function deletePixel(id: number) {
    const response = await request(`${base_url}`)
        .delete("/api/pixel/" + id + "/delete")
        .set('Authorization', `${token}`);
    if (response.body.error === 0) {
        console.log('successfull delete pixel id ' + id);
    } else {
        console.log('failed delete pixel id ' + id);
    }
}
