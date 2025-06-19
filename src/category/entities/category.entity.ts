import {Entity, Column, OneToMany, PrimaryGeneratedColumn  } from "typeorm";
import { Field, ObjectType} from "@nestjs/graphql";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

@ObjectType
@Entity


export class Category {

    //is id needed for each category???
    @Field(()=>Number)
    @PrimaryGeneratedColumn()
    id:number;


    @Field(()=>String)
    @Column()
    name:string;

    //A category can have many restaurants but a restaurant can only belong to one category
    //An array of restaurants belonging to that category and a category can have zero restaurants
    @Field(()=>[Restaurant], {nullable:true})
    @OneToMany(()=>Restaurant, restaurant => restaurant.category)
    restaurants:Restaurant[];
}
