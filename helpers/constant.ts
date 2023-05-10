import * as dotenv from 'dotenv'
dotenv.config();

export const BASE_URL = process.env.BASE_URL;
export const TOKEN = process.env.TOKEN;
export const DEFAULT_TIMEOUT = 20000;
