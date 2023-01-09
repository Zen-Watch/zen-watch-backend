import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection

db.on('error', (error: any) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB database'))

app.use(express.json())

const analyticsRouter = require('./routes/analytics')
app.use('/analytics', analyticsRouter)

app.listen(3000, ()=> console.log('Server Started!!'))
