export function generateRandomString() {
    return Math.random().toString(36).substring(3, 10);
}

export function generateRandomPixelType() {
    const types = ["gapixel", "adwordspixel", "twitterpixel", "adrollpixel", "pinterest", "bing", "snapchat", "reddit", "tiktok"];
    return types[Math.floor(Math.random() * types.length)];
}
