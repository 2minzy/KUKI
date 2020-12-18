import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateShopDto } from './dtos/create-shops.dtp';
import { UpdateShopDto } from './dtos/update-shop.dto';
import { Shops } from './entities/shops.entity';
import { ShopsService } from './shops.service';

@Resolver((of) => Shops)
export class ShopsResolver {
  constructor(private readonly shopsService: ShopsService) {}

  @Query((returns) => [Shops])
  shops(): Promise<Shops[]> {
    return this.shopsService.getAll();
  }
  @Mutation((returns) => Boolean)
  async createShop(
    @Args('input') createShopsDto: CreateShopDto,
  ): Promise<boolean> {
    try {
      await this.shopsService.createShop(createShopsDto);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateShop(
    @Args('input') updateShopDto: UpdateShopDto,
  ): Promise<boolean> {
    try {
      await this.shopsService.updateShop(updateShopDto);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
