import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserJoiValidatePipe implements PipeTransform {
  constructor(private readonly schema: Object) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('UserJoiValidatePipe value:', value)
    const { error } = Joi.validate(value, this.schema);
    if (error) {
      console.log('UserJoiValidatePipe error:', error)
      throw new BadRequestException(error.details[0].message);
    }
    return value;
  }
}

@Injectable()
export class UserClassValidatePipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log('UserClassValidatePipe error:', errors)
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}