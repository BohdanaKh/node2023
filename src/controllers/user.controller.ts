import { Request, Response } from "express";

import { users } from "../db/users.db";

interface IUser {
  name: string;
  age: number;
  gender: string;
}
class UserController {
  public async findAll(
    req: Request,
    res: Response
  ): Promise<Response<IUser[]>> {
    try {
      // return res.json(users);
      throw new Error("Smth went wrong");
    } catch (e) {
      return res.json({
        message: e.message,
        status: 400,
      });
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    res.status(200).json(users[+id]);
  }

  public create(req: Request, res: Response) {
    users.push(req.body);

    res.status(201).json({
      message: "User created.",
    });
  }

  public async updateById(req: Request, res: Response) {
    const { id } = req.params;

    users[+id] = req.body;

    res.status(200).json({
      message: "User updated",
      data: users[+id],
    });
  }

  public async deleteById(req: Request, res: Response) {
    const { id } = req.params;

    users.splice(+id, 1);

    res.status(200).json({
      message: "User deleted",
    });
  }
}
export const userController = new UserController();
