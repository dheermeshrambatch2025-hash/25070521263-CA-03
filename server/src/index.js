import mongoose from 'mongoose';import {config} from './config.js';import app from './app.js';
try{await mongoose.connect(config.mongoUri);console.log('MongoDB connected');app.listen(config.port,'127.0.0.1',()=>console.log(`Saffron & Slate API listening on http://127.0.0.1:${config.port}`));}catch(e){console.error('Startup failed. Check MongoDB and server/.env:',e.message);process.exit(1);}
