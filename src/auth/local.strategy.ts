import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(uname: string, passwd: string): any {
    const user = this.authService.validateUser(uname, passwd);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
