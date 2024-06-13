import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { Public } from './decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('encryption')
  @Public()
  encryptionText(@Body() data: { text: string }) {
    return this.authService.encryption(data.text);
  }

  @Post('hashing')
  @Public()
  hashingPassword(@Body() data: { password: string }) {
    return this.authService.hashingPassword(data.password);
  }

  @Get('profile')
  getProfile() {
    return {
      user: {},
    };
  }
}
