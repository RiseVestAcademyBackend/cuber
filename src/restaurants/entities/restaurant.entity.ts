import {Entity, Column, ManyToMany, OneToMany, RelationId  } from "typeorm";
import { Field, ObjectType, InputType } from "@nestjs/graphql";
import { IsString, IsNumber, IsEmail } from "@nestjs/class-validator";

@ObjectType()
@Entity()
export class Restaurant {
    @Column()
    @IsString()
    @Field(() => String)
    name: string;

    @Column()
    @IsString()
    coverImage: string;
    
    @Column()
    @IsString()
    address: string;

    category: [];
    menu: [];

    @Column()
    @IsString()
    @Field(() => String)
    owner: string; // user
    
    ownerId: number;

    @Field(() => [String])
    // @OneToMany((type) => String)
    orders: string; // orders
 }

