import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Order } from 'src/orders/entities/order.entity';
import { IsString, IsEmail, IsEnum } from '@nestjs/class-validator';
import { UserRole } from 'src/utility/role.enum';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @IsString()
  @Field(() => String)
  name: string;

  @Column()
  @IsEmail()
  @Field(() => String)
  email: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  @Field(() => UserRole)
  role: UserRole;

  //as an owner
  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  @Field(() => [Restaurant], { nullable: true })
  restaurants: Restaurant[];

  //as a customer
  @OneToMany(() => Order, (order) => order.customer)
  @Field(() => [Order], { nullable: true })
  orders: Order[];

  //as a delivery person
  @OneToMany(() => Order, (order) => order.driver)
  @Field(() => [Order], { nullable: true })
  deliveries: Order[];
}
