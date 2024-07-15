import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authservice : AuthService, private configservice : ConfigService){
        let secretKey = configservice.get('SECRET_AUTH_DEV')
        if(configservice.get('NODE_ENV') === 'production') secretKey = configservice.get('SECRET_AUTH')

        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: secretKey,
        })
    }

    validate(payload:any){
      console.log(payload)
      return payload
    }
}