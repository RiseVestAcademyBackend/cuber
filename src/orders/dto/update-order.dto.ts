import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { orderStatus } from '../enums/order-status.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsString()
    @IsNotEmpty()
    orderId: string;

    @IsEnum(orderStatus)
    @IsNotEmpty()
    status: orderStatus;

    @IsString()
    @IsOptional()
    driverId?: string;

}
