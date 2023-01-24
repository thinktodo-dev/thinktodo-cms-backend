import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from '../../../utils/constants';
import { JwtPayloadDto } from '../dto/jwt.payload.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

 validate(payload: any):JwtPayloadDto {
    return new JwtPayloadDto(payload.id,payload.username,payload.password);
  }
}