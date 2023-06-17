import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

class UserMiddleware {
  public findAndThrow(field: keyof IUser) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] });

        if (user) {
          throw new ApiError("User with this email already exist", 409);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isUserExist<T>(field: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).select(
          "password"
        );
        if (!user) {
          throw new ApiError("User not found", 422);
        }

        res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getDynamicallyOrThrow(field: keyof IUser) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).select(
          "email"
        );
        if (!user) {
          throw new ApiError("User not found", 422);
        }
        req.res.locals = { user };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  // public getDynamicallyOrThrow(
  //   fieldName: string,
  //   from: "body" | "query" | "params" = "body",
  //   dbField: keyof IUser = "email"
  // ) {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const fieldValue = req[from][fieldName];
  //       const user = await User.findOne({ [dbField]: fieldValue });
  //       if (!user) {
  //         throw new ApiError("User not found", 422);
  //       }
  //       req.res.locals = { user };
  //       next();
  //     } catch (e) {
  //       next(e);
  //     }
  //   };
  // }
}

export const userMiddleware = new UserMiddleware();
