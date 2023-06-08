import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { User } from "../models";
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

  public async isUserIdExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new ApiError("user is not found", 400);
      }
      res.locals.user = user;
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

      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isMongoIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!isObjectIdOrHexString(req.params.id)) {
        throw new ApiError("id is not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
