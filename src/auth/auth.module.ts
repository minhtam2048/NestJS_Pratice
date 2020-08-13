import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/schemas/user.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'User', schema: UserSchema }
      ],
    ),
    PassportModule,
    JwtModule.register({
      secret: 'SuperMegaUltraEpicSecretKey',
      signOptions: {
        expiresIn: '60s'
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
