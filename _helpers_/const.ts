export const base_url = 'https://urlbae.com';
export const token = 'Bearer 1443d1596f0b66b5f96c62a2c778234f';
export var randomName = Math.random().toString(36).substring(3, 10);
export var randomSlug = Math.random().toString(36).substring(2, 7);
export var randomDescription = Math.random().toString(36).substring(4, 14);
const types = ["gapixel", "adwordspixel", "twitterpixel", "adrollpixel", "pinterest", "bing", "snapchat", "reddit", "tiktok"];
export var randomType = types[Math.floor(Math.random() * types.length)];
export var randomTag = Math.random().toString(36).substring(2, 7);