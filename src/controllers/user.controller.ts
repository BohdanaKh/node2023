import { NextFunction, Request, Response } from "express";

import { userService } from "../services";
import { IUser } from "../types";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      // const createdUser = await userService.create(req.res.locals as IUser);
      const createdUser = await userService.create(req.body);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      // const user = await userService.findById(req.params.id);
      const { userId } = req.params;

      const user = await userService.findById(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const updatedUser = await userService.updateById(userId, req.body);

      // const { error, value } = UserValidator.update.validate(req.body);
      // if (error) {
      //   throw new ApiError(error.message, 400);
      // }

      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      // await userService.deleteById(req.params.id);
      const { userId } = req.params;

      await userService.deleteById(userId);

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
