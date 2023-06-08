import { NextFunction, Request, Response } from "express";
// import mongoose from "mongoose";

import { ApiError } from "../errors";
import { UserValidator } from "../validators";

class UserMiddleware {
  public isCreateValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.res.locals = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  public isUpdateValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.res.locals = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  // public async isMongoIdValid(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     mongoose.isValidObjectId(req.params.id)?
  //     // const userId = req.params.id;
  //     // const objectID = new mongoose.Types.ObjectId(userId);
  //     // const objectIDString = objectID.toString();
  //     // return objectIDString === req.params.id;
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}
export const userMiddleware = new UserMiddleware();
