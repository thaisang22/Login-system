/* eslint-disable prettier/prettier */
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
// import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { AuthDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private conFigService: ConfigService
    ) {}

    async register(authDTO: AuthDTO) {
        try {
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(authDTO.password, 10);

            // Create a new user in the database
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashedPassword,
                },
            });

            return await this.convertToJwtString(user.id , user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002': // Unique constraint failed
                        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
                    // Add more cases for different Prisma error codes if needed
                    default:
                        throw new HttpException('Database error', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            // Handle other types of errors
            throw new HttpException(error.message || 'An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(authDTO: AuthDTO) {
        try {
            // Fetch the user from the database
            const user = await this.prismaService.user.findUnique({
                where: { email: authDTO.email },
            });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            // Validate the password
            const isPasswordValid = await bcrypt.compare(authDTO.password, user.hashedPassword);

            if (!isPasswordValid) {
                throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
            }

            return await this.convertToJwtString(user.id , user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new HttpException('Database error', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            throw new HttpException(error.message || 'An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async convertToJwtString(userid: number , email: string): Promise<{accessToken: string}> {
        const payload = {
            sub: userid,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn:'60m',
            secret:this.conFigService.get('JWT_SECRET')
        })
        return {
            accessToken: jwtString,
        }
    }
}