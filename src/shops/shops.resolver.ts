import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateShopDto } from './dtos/create-shops.dtp';
import { Shops } from './entities/shops.entity';

@Resolver(of => Shops)
export class ShopsResolver {
  @Query(returns => [Shops])
  shops(@Args('veganOnly') veganOnly: boolean): Shops[] {
    return [];
    }
  @Mutation(returns => Boolean) 
  createShop(
    @Args() createShopsDto: CreateShopDto,
  ): boolean {
    return true;
  }
}