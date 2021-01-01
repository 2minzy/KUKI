import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { CategoryRepository } from './repositories/cateogory.repository';
import { CategoryResolver, ShopResolver } from './shops.resolver';
import { ShopService } from './shops.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, CategoryRepository])],
  providers: [ShopResolver, CategoryResolver, ShopService],
})
export class ShopsModule {}
