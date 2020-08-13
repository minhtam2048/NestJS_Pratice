import { Controller, Post, Body, ValidationPipe, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authcredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.authService.signUp(authcredentialsDTO)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Request() req) {
    return await this.authService.signIn(req.user);
  }
}
