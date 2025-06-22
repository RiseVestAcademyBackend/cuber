import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "@nestjs/class-validator";
import { Type } from "@nestjs/class-transformer"

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    restaurantId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FoodItem)
    @IsNotEmpty()
    food: FoodItem[];
}

class FoodItem {
    @IsString()
    @IsNotEmpty()
    foodId: string;

    @IsNumber()
    quantity: number;
}

