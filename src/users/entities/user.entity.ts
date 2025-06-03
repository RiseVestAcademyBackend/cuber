import {Entity, Column, ManyToMany, OneToMany, RelationId  } from "typeorm";
import { Field, ObjectType, InputType } from "@nestjs/graphql";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { Order } from "src/orders/entities/order.entity";
import { IsString, IsEmail, IsEnum } from "@nestjs/class-validator";

export enum UserRole {
    Owner = "Owner",
    Client = "Client",
    Delivery = "Delivery"
}

@ObjectType()
@Entity()
export class User {
    
    @Column()
    @IsString()
    @Field(() => String)
    name: string;
    
    @Column()
    @IsEmail()
    @Field((returns) => String)
    email: string;

    @Column( {select: false})
    @IsString()
    @Field((returns) => String)
    password: string;
    
    @Column()
    @Field((type) => Restaurant, (restaurant) => restaurant.owner )
    restaurant: Restaurant[];

    @Column()
    @Field((type) => Order, (order) => order.customer )
    orders: Order[]
    
    @Column( { type : 'enum', enum: UserRole})
    @IsEnum(UserRole)
    @Field((returns) => UserRole)
    role: UserRole;
}
