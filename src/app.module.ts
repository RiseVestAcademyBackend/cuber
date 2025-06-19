import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RestaurantsModule, OrdersModule, PaymentsModule, CategoryModule, FoodModule, CustomersModule, UsersModule, DriversModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
