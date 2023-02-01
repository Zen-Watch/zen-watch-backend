import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect_to_mysql } from './db/connection_pool';
import { INVALID_API_KEY, UNAUTHORIZED_ACCESS, X_API_KEY_HEADER } from './utils/constants';

dotenv.config();
const app = express()

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = [process.env.ALLOWED_ORIGIN!];

const options: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST']
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json())

// Developer api_key authentication middleware 
// Only allow zen.watch dev_api_key for admin api
function authenticate_zen_watch_api_key(req: Request, res: Response, next: NextFunction) {
  try {
    const host = req.get('host');
    const origin = req.get('origin');
    console.log('HOST', 'ORIGIN', host, origin);
    const api_key = req.header(X_API_KEY_HEADER)!
    if (api_key === process.env.ALLOWED_DEV_API_KEY)
      next()
    else
      res.status(UNAUTHORIZED_ACCESS).send({ status: UNAUTHORIZED_ACCESS, message: INVALID_API_KEY })
  } catch (err) {
    res.status(UNAUTHORIZED_ACCESS).send({ status: UNAUTHORIZED_ACCESS, message: INVALID_API_KEY })
  }
}

app.use(authenticate_zen_watch_api_key);

// warm up the mysql connection pool
connect_to_mysql();

const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)

app.listen(process.env.SERVER_PORT, () => console.log('Server Started!!'))
