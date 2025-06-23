import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'src/mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderWithRelations } from './dto/order-relations.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly mailerService: MailerService,
  ) {}
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepo.create(dto);
    const savedOrder = await this.orderRepo.save(newOrder);

    // Fetch restaurant and its owner
    const restaurant = (await this.orderRepo.findOne({
      where: { id: savedOrder.id },
      relations: ['restaurant', 'restaurant.owner'],
    })) as OrderWithRelations;

    const owner = restaurant?.restaurant?.owner;
    if (owner) {
      const emailData = {
        receipients: [
          {
            name: owner.name,
            address: owner.email,
          },
        ],
        subject: `New Order for ${restaurant.restaurant.name}`,
        html: `
          <h1>Hello ${owner.name},</h1>
          <p>A new order has been placed at your restaurant <strong>${restaurant.restaurant.name}</strong>.</p>
          <p>Total Price: <strong>${savedOrder.total_price}</strong></p>
          <p>Order ID: <strong>${savedOrder.id}</strong></p>
          <p>Status: <strong>${savedOrder.status}</strong></p>
          <br />
          <p>Check your dashboard for more details. Thank you for using Cuber :) </p>
        `,
      };

      await this.mailerService.sendEmail(emailData);
    }

    return savedOrder;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
