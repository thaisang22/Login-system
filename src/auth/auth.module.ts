import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-default-secret', // Replace with your secret or environment variable
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
  providers: [AuthService , JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
