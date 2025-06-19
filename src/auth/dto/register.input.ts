import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsEnum } from '@nestjs/class-validator';
import { UserRole } from '../../users/entities/user.entity';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}
