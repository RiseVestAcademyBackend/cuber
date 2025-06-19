import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

export enum UserRole {
  Owner = 'Owner',
  Client = 'Client',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => String)
  refreshToken: string;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  expiresAt: Date;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  role: UserRole;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}



