import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shops } from './entities/shops.entity';
import { ShopsResolver } from './shops.resolver';
import { ShopsService } from './shops.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shops])],
  providers: [ShopsResolver, ShopsService],
})
export class ShopsModule {}
