import * as dotenv from 'dotenv'
dotenv.config();

export const base_url = process.env.BASE_URL;
export const token = process.env.TOKEN;
export const DEFAULT_TIMEOUT = 20000;
