import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPayload, ITokensPair } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public generateActionToken(
    payload: IActionTokenPayload
    // tokenType: EActionTokenType
  ): string {
    const secret = configs.ACTIVATE_SECRET;

    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }

  public checkActionToken(token: string) {
    try {
      const secret = configs.ACTIVATE_SECRET;
      return jwt.verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public checkToken(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case ETokenType.Access:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.Refresh:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
