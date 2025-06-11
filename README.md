#cuber
uber-eats clone

##Users

`name/email//password/role/Restaurant/payment/`

Actions Of The user
-User should be able to update their profile (email, password, role).   -- crud
-User should be able to delete their account.  
-User should receive a JWT token after signup/login.  
-User should be prevented from accessing unauthorized resources (RBAC enforcement).  
-User should see their own orders (if customer) or deliveries (if delivery).  
-User should be verified before owning/creating restaurants (optional business verification).

##Restaurant

Action of  Restaurant


-Owner should be able to update or (soft) delete their restaurant.  
-Owner should be able to view all orders placed for their restaurant.  
-Owner should only see and manage restaurants they own.  
-Owner should be notified when a new order is placed.  
-Owner should be able to mark an order as "Accepted" or "Rejected".

##Orders
-----
    1. id
    2. user
    3. Restaurant
    4. rider
    5. item/content/food/dish
    6. status ()

Action To Be Taken On Orders
-----------------------
-Customer should be able to view their past orders.
-Customer should be able to cancel an order if it is still pending.
-Order should progress through statuses: Pending → Accepted → PickedUp → Delivered.
-Owner should be able to change order status to "Accepted" or "Rejected".
-Delivery person should be able to see available (Accepted) orders.
-Delivery person should be able to pick up an order (changing status to "PickedUp").
-Delivery person should be able to mark an order as "Delivered".
-System should prevent status changes out of order (e.g., can't deliver if not picked up).

##Delivery
------

-Delivery person should see only "Accepted" orders not yet picked up.  
-Delivery person should not pick up the same order as another driver.  
-Delivery person should see only the orders they are assigned to.  
-Delivery person should not see customer contact info until an order is picked up.
-Delivery person should confirm order has delivered by entering code given to client

##Bonus

Security and Validation

1-System should hash passwords securely using bcrypt.  
2-System should validate all DTOs using class-validator.  
3-System should guard all protected routes with JWT strategy.  
//4-System should only allow actions based on user roles (Owner, Customer, Delivery). -- role/permision


Pre-Task 
------
1. Schema for each module
2. Database ( Antony and Zara )