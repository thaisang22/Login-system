/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth() // Add this decorator to enable the Bearer token for JWT
@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Return current user information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  me(@Req() request: Request) { // request from validate to jwt.strategy
    // console.log(request.user)
    return request.user;
  }
}
