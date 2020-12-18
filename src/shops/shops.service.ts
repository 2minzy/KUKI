import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dtos/create-shops.dtp';
import { UpdateShopDto } from './dtos/update-shop.dto';
import { Shops } from './entities/shops.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shops)
    private readonly shops: Repository<Shops>,
  ) {}
  getAll(): Promise<Shops[]> {
    return this.shops.find();
  }
  createShop(createShopDto: CreateShopDto): Promise<Shops> {
    const newShop = this.shops.create(createShopDto);
    return this.shops.save(newShop);
  }
  updateShop({ id, data }: UpdateShopDto) {
    return this.shops.update(id, { ...data });
  }
}
