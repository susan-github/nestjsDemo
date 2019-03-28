import { Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, UsePipes } from '@nestjs/common';
import { ForbiddenException } from './../common/exception';
import { HttpExceptionFilter } from './../common/exception/filters';
import { UserJoiValidatePipe, UserClassValidatePipe } from './users.validation';
import { createUserSchema } from './schema/user.schema';
import { CreateUserDto } from './users.dto'

@Controller('users')
export class UsersController {
  @Get()
  findOne() {
    return 'This is user find function.'
  }

  @Get('exception/http')
  // @UseFilters(new HttpExceptionFilter())
  httpException() {
    throw new ForbiddenException()
  }

  @Get('exception/common')
  commonException() {
    throw new Error()
  }

  @Post('validate/joi')
  @UsePipes(new UserJoiValidatePipe(createUserSchema))
  joiValidate(@Body() createUserDto: any) {
    return 'create success'
  }

  @Post('validate/class')
  @UsePipes(new UserClassValidatePipe())
  classValidate(@Body() createUserDto: CreateUserDto) {
    return 'create success'
  }
}