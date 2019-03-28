import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}