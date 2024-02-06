import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from 'src/utils/guard/constants';
import { JwtStrategy } from 'src/utils/guard/jwt.strategy';
import { LocalStrategy } from 'src/utils/guard/local.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [UsersService],

})
export class UsersModule { }
