import express, { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connect_to_mysql } from "./db/connection_pool";
import { get_developer_by_api_key_from_cache } from './cache/developer.cache';
import { INVALID_API_KEY, UNAUTHORIZED_ACCESS, X_API_KEY_HEADER } from './utils/constants';

dotenv.config();
const app = express();

const options: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST']
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());

// Developer api_key authentication middleware
function authenticate_dev_api_key(req: Request, res: Response, next: NextFunction) {
  try {
    const api_key = req.header(X_API_KEY_HEADER)!
    get_developer_by_api_key_from_cache(api_key)
      .then(_ => next())
      .catch(_ => res.status(UNAUTHORIZED_ACCESS).send({ status: UNAUTHORIZED_ACCESS, message: INVALID_API_KEY }))
  } catch (err) {
    res.status(UNAUTHORIZED_ACCESS).send({ status: UNAUTHORIZED_ACCESS, message: INVALID_API_KEY })
  }
}

app.use(authenticate_dev_api_key);

// warm up the mysql connection pool
connect_to_mysql();

const analyticsRouter = require("./routes/analytics");
app.use("/analytics", analyticsRouter);

app.listen(process.env.SERVER_PORT, () => console.log("Server Started!!"));
