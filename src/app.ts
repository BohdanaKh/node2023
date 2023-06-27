import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, userRouter } from "./routers";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT}`);
});
