import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { Shop } from './entities/shop.entity';
import { CategoryRepository } from './repositories/cateogory.repository';
import { CategoryResolver, DishResolver, ShopResolver } from './shops.resolver';
import { ShopService } from './shops.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Dish, CategoryRepository])],
  providers: [ShopResolver, CategoryResolver, DishResolver, ShopService],
})
export class ShopsModule {}
