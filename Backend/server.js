import express from 'express';
import cors from 'cors';
import coonectdb from './src/config/connect.js';
import router from './src/routes/check.routes.js';
import routerr from './src/routes/new.routes.js';
import 'dotenv/config';
import r from './src/routes/payment.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/users', router);
app.use('/api/payment',r);

app.listen(3000, async () => {
    try {
        await coonectdb();
        console.log("Connection Succssfull Port running on 3000")
    }
    catch (err) {
        console.log('Running port is failed')
    }
})
