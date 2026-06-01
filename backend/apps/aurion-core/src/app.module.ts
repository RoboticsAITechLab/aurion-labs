import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InquiriesModule } from './inquiries/inquiries.module';

@Module({
  imports: [UsersModule, AuthModule, InquiriesModule],
})
export class AppModule {}
