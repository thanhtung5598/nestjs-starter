import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Res,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { Public } from './decorators/skip-auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CheckTokenExpiryGuard } from './guards/check-token-expire.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Public()
  signInPassport(@Body() req: SignInDto) {
    return this.authService.signIn(req.username, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/profile')
  @Public()
  getProfileTest(@Request() req) {
    return req.user;
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

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @Public()
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Res() res: Response) {
    try {
      const googleToken = req.user.accessToken;
      const googleRefreshToken = req.user.refreshToken;

      res.cookie('access_token', googleToken, {
        httpOnly: true,
        secure: true,
      });
      res.cookie('refresh_token', googleRefreshToken, {
        httpOnly: true,
        secure: true,
      });

      const redirectUrl = `${process.env.REDIRECT_URL}/v1/auth/profile`;
      res.redirect(redirectUrl);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get('profile')
  @Public()
  async getProfile(@Request() req) {
    const accessToken = req.cookies['access_token'];
    if (accessToken)
      return (await this.authService.getProfile(accessToken))?.data;
    throw new UnauthorizedException('No access token');
  }

  @Get('logout')
  @Public()
  async logout(@Req() req, @Res() res: Response) {
    try {
      const refreshToken = req.cookies['refresh_token'];
      if (refreshToken) {
        await this.authService.revokeGoogleToken(refreshToken);
      }
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');

      const redirectUrl = process.env.REDIRECT_URL || '';
      res.redirect(redirectUrl);
    } catch (error) {}
  }
}
