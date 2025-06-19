import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Field, ObjectType} from '@nestjs/graphql';
import { Customer } from 'src/customers/entities/customer.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Payment {
    @Field(()=>Number)
    @PrimaryGeneratedColumn()
    id:number;

    @Field(()=>String)
    @Column()
    transactionId: string;

    @Field(()=>Customer)
    @ManyToOne(()=>Customer, customer=>customer.payments)
    customer:Customer;

    @Field(() => Restaurant)
    @ManyToOne(() => Restaurant)
    restaurant: Restaurant;

    @Field(() => Date)
    @Column()
    paidAt: Date;

}
