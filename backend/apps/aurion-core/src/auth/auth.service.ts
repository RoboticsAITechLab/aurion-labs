import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

const COOKIE_NAME = 'aurion_session';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async signUp(name: string, email: string, password: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.create({ name, email, passwordHash });

    const token = this.signToken(user.id);

    return { user: this.userToPublic(user), token };
  }

  async signIn(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const token = this.signToken(user.id);
    return { user: this.userToPublic(user), token };
  }

  signToken(userId: string) {
    return this.jwt.sign({ sub: userId });
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(token);
      if (!payload || !payload.sub) return null;
      const user = await this.users.findById(String(payload.sub));
      if (!user) return null;
      return { user: this.userToPublic(user), token };
    } catch {
      return null;
    }
  }

  private userToPublic(user: any) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl ?? null,
      role: user.role ?? undefined,
      tenantId: user.tenantId ?? null,
    };
  }
}
