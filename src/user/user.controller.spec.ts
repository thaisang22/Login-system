/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ExecutionContext } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;

  // Setup the testing module and mock the AuthGuard
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'AuthGuard',
          useValue: {
            // Mock the canActivate method of the AuthGuard
            canActivate: jest.fn().mockImplementation((context: ExecutionContext) => {
              const request = context.switchToHttp().getRequest();
              // Set a mock user in the request object
              request.user = { id: 1, email: 'test@example.com' };
              return true; // Allow the request to pass through the guard
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // Test if UserController is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Tests for the 'me' method
  describe('me', () => {
    // Test if the 'me' method returns the current user
    it('should return the current user', () => {
      const request = {
        user: { id: 1, email: 'test@example.com' }, // Mock request object with user
      };
      expect(controller.me(request as any)).toEqual(request.user); // Call 'me' method and check the result
    });
  });
});
