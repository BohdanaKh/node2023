import express from "express";

import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);



const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
