import { Order } from '../entities/order.entity';
export type OrderWithRelations = Order & {
  restaurant: {
    name: string;
    owner: {
      name: string;
      email: string;
    };
  };
};
