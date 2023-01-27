import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect_to_mysql } from "./db/connection_pool";

dotenv.config();
const app = express();

const options: cors.CorsOptions = {
  origin: '*',
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());

// warm up the mysql connection pool
connect_to_mysql();

const analyticsRouter = require("./routes/analytics");
app.use("/analytics", analyticsRouter);

app.listen(process.env.SERVER_PORT, () => console.log("Server Started!!"));
