import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

const COOKIE_NAME = 'aurion_session';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.signUp(body.name, body.email, body.password);
    res.cookie(COOKIE_NAME, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { user: result.user, accessToken: result.token };
  }

  @Post('signin')
  async signIn(@Body() body: SignInDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.signIn(body.email, body.password);
    res.cookie(COOKIE_NAME, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { user: result.user, accessToken: result.token };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(COOKIE_NAME);
    return { loggedOut: true };
  }

  @Get('me')
  async me(@Req() req: Request) {
    const token = req.cookies?.[COOKIE_NAME] ?? null;
    if (!token) return null;
    const session = await this.auth.validateToken(token);
    return session?.user ?? null;
  }
}
