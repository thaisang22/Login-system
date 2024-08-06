/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should hash the password and create a new user', async () => {
      const authDTO: AuthDTO = { email: 'test@example.com', password: 'password' };
      const hashedPassword = await bcrypt.hash(authDTO.password, 10);
      const user = { id: 1, email: authDTO.email, hashedPassword };

      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);
      jest.spyOn(prismaService.user, 'create').mockResolvedValueOnce(user);

      const result = await service.register(authDTO);
      expect(result).toEqual(user);
      expect(bcrypt.hash).toHaveBeenCalledWith(authDTO.password, 10);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: authDTO.email,
          hashedPassword: hashedPassword,
        },
      });
    });

    it('should handle unique constraint error', async () => {
      const authDTO: AuthDTO = { email: 'test@example.com', password: 'password' };

      jest.spyOn(prismaService.user, 'create').mockRejectedValueOnce(
        new PrismaClientKnownRequestError('Unique constraint failed', 'P2002', '1.0.0'),
      );

      await expect(service.register(authDTO)).rejects.toThrow('Email already exists');
    });
  });

  describe('login', () => {
    it('should return user data on successful login', async () => {
      const authDTO: AuthDTO = { email: 'test@example.com', password: 'password' };
      const user = { id: 1, email: authDTO.email, hashedPassword: await bcrypt.hash(authDTO.password, 10) };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await service.login(authDTO);
      expect(result).toEqual({ message: 'Login successful' });
    });

    it('should throw an error if user is not found', async () => {
      const authDTO: AuthDTO = { email: 'test@example.com', password: 'password' };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.login(authDTO)).rejects.toThrow('User not found');
    });

    it('should throw an error if password is invalid', async () => {
      const authDTO: AuthDTO = { email: 'test@example.com', password: 'password' };
      const user = { id: 1, email: authDTO.email, hashedPassword: await bcrypt.hash(authDTO.password, 10) };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await expect(service.login(authDTO)).rejects.toThrow('Invalid password');
    });
  });
});
