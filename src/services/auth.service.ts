import { EActionTokenType, EEmailActions, EUserStatus } from "../enums";
import { ApiError } from "../errors";
import { Action, OldPassword, Token, User } from "../models";
import { ICredentials, ITokenPayload, ITokensPair, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      // const activateToken = jwt.sign(payload, configs.ACTIVATE_SECRET, { expiresIn: "7d" });

      await User.create({ ...data, password: hashedPassword });
      // const actionToken = tokenService.generateActionToken(
      //   { _id: data._id }
      // EActionTokenType.activate
      // );
      // await Action.create({
      //   actionToken,
      //   tokenType: EActionTokenType.activate,
      //   _userId: data._id,
      // });
      // await emailService.sendEmail(data.email, EEmailActions.ACTIVATE, {
      //   token: actionToken,
      await emailService.sendEmail(data.email, EEmailActions.WELCOME, {
        name: data.name,
        // url:"https://localhost:5100/activate-acoount/{{activateToken}}"
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokensPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      const tokensPair = await tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        ...tokensPair,
        _userId: user._id,
      });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    oldTokenPair: ITokensPair,
    tokenPayload: ITokenPayload
  ): Promise<ITokensPair> {
    try {
      const tokensPair = await tokenService.generateTokenPair(tokenPayload);
      await Promise.all([
        Token.create({ _userId: tokenPayload._id, ...tokensPair }),
        Token.deleteOne({ refreshToken: oldTokenPair.refreshToken }),
      ]);
      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    dto: { newPassword: string; oldPassword: string },
    userId: string
  ): Promise<void> {
    try {
      const oldPasswords = await OldPassword.find({ _userId: userId });
      await Promise.all(
        oldPasswords.map(async ({ password: hash }) => {
          const isMatched = await passwordService.compare(
            dto.oldPassword,
            hash
          );
          if (isMatched) {
            throw new ApiError("Wrong old password", 400);
          }
        })
      );

      const user = await User.findById(userId).select("password");

      const isMatched = await passwordService.compare(
        dto.oldPassword,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Wrong old password", 400);
      }

      const newHash = await passwordService.hash(dto.newPassword);
      await Promise.all([
        OldPassword.create({ password: user.password, _userId: userId }),
        User.updateOne({ _id: userId }, { password: newHash }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendActivateToken(user: IUser): Promise<void> {
    try {
      console.log(user._id);
      const actionToken = tokenService.generateActionToken(
        { _id: user._id }
        // EActionTokenType.activate
      );
      await Action.create({
        actionToken,
        tokenType: EActionTokenType.activate,
        _userId: user._id,
      });
      await emailService.sendEmail(user.email, EEmailActions.ACTIVATE, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(userId: string): Promise<void> {
    try {
      await User.updateOne(
        { _id: userId },
        { $set: { status: EUserStatus.active } }
      );
      await Token.deleteMany({
        _user_id: userId,
        tokenType: EActionTokenType.activate,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
