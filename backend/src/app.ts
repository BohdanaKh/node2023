import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
// import rateLimit from "express-rate-limit";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
// import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, userRouter } from "./routers";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

// const apiLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 10,
//   standardHeaders: true,
// });
//
// app.use("*", apiLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/users", userRouter);

app.use("/auth", authRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;

  return res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

const dbConnect = async () => {
  let dbCon = false;

  while (!dbCon) {
    try {
      console.log('Connecting to database');
      await mongoose.connect(configs.DB_URL);
      dbCon = true
    } catch (e) {
      console.log('Database unavailable, wait 3 seconds');
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }
}

const start = async () => {
  try {
    await dbConnect();
    await app.listen(configs.PORT, () => {
      console.log(`Server has started on PORT ${configs.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start()

// app.listen(configs.PORT, async () => {
//   await mongoose.connect(configs.DB_URL);
//   cronRunner();
//   console.log(`Server has started on PORT ${configs.PORT}`);
// });
