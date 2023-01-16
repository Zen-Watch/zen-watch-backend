import express from 'express';
import dotenv from 'dotenv';
import { connect_to_mysql } from './db/connection_pool';

dotenv.config();
const app = express()

app.use(express.json())

// warm up the mysql connection pool
connect_to_mysql();

const analyticsRouter = require('./routes/analytics')
app.use('/analytics', analyticsRouter)

app.listen(process.env.SERVER_PORT, ()=> console.log('Server Started!!'))