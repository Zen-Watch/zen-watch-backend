import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect_to_mysql } from './db/connection_pool';

dotenv.config();
const app = express()

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = [process.env.ALLOWED_ORIGIN!];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json())

// warm up the mysql connection pool
connect_to_mysql();

const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)

app.listen(process.env.SERVER_PORT, ()=> console.log('Server Started!!'))
