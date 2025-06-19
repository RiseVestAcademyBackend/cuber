import {Entity, Column, ManyToMany, OneToMany, RelationId, ManyToOne  , JoinTable} from "typeorm";
import { Field, ObjectType, InputType } from "@nestjs/graphql";
import { IsString, IsNumber, IsEmail } from "@nestjs/class-validator";
import { Category } from "src/category/entities/category.entity";


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

    //Many restaurants can belong to many category
    @Field(()=>[Category])
    @ManyToMany(()=>Category, category=>category.restaurants)
    @JoinTable()
    categories:Category[];
 }

