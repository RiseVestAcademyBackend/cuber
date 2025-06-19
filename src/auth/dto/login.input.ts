import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from '@nestjs/class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
