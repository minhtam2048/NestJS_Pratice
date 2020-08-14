import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`
    });
  }
  
  async validate(payload: any) {
    console.log(payload);
    return { _id: payload.sub, username: payload.username };
  }
}