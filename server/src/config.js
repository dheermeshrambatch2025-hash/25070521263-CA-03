import dotenv from 'dotenv'; dotenv.config();
const secret=process.env.SESSION_SECRET||'';
if(secret.length<32) throw new Error('SESSION_SECRET must be at least 32 characters. Set it in server/.env.');
export const config={port:Number(process.env.SERVER_PORT||5000),origin:process.env.CLIENT_ORIGIN||'http://localhost:5173',mongoUri:process.env.MONGO_URI||'mongodb://127.0.0.1:27017/saffron_slate',sessionSecret:secret,cookieName:process.env.SESSION_COOKIE_NAME||'ss.sid',secureCookies:process.env.NODE_ENV==='production'};
