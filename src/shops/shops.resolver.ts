import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User, UserRole } from 'src/users/entities/user.entity';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { CreateShopInput, CreateShopOutput } from './dtos/create-shop.dto';
import { EditShopInput, EditShopOutput } from './dtos/edit-shop.dto';
import { DeleteShopInput, DeleteShopOutput } from './dtos/delete-shop.dto';
import { ShopInput, ShopOutput } from './dtos/shop.dto';
import { ShopsInput, ShopsOutput } from './dtos/shops.dto';
import {
  SearchShopInput,
  SearchShopOutput,
} from './dtos/search-restaurant.dto';
import { Category } from './entities/category.entity';
import { Shop } from './entities/shop.entity';
import { ShopService } from './shops.service';

@Resolver((of) => Shop)
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @Mutation((returns) => CreateShopOutput)
  @Role(['Owner'])
  async createShop(
    @AuthUser() authUser: User,
    @Args('input') createShopInput: CreateShopInput,
  ): Promise<CreateShopOutput> {
    return this.shopService.createShop(authUser, createShopInput);
  }

  @Mutation((returns) => EditShopOutput)
  @Role(['Owner'])
  editShop(
    @AuthUser() owner: User,
    @Args('input') editShopInput: EditShopInput,
  ): Promise<EditShopOutput> {
    return this.shopService.editShop(owner, editShopInput);
  }

  @Mutation((returns) => DeleteShopOutput)
  @Role(['Owner'])
  deleteShop(
    @AuthUser() owner: User,
    @Args('input') deleteShopInput: DeleteShopInput,
  ): Promise<DeleteShopOutput> {
    return this.shopService.deleteShop(owner, deleteShopInput);
  }

  @Query((returns) => ShopsOutput)
  shops(@Args('input') shopsInput: ShopsInput): Promise<ShopsOutput> {
    return this.shopService.allShops(shopsInput);
  }

  @Query((returns) => ShopOutput)
  shop(@Args('input') shopInput: ShopInput): Promise<ShopOutput> {
    return this.shopService.findShopById(shopInput);
  }

  @Query((returns) => SearchShopOutput)
  searchShop(
    @Args('input') searchShopInput: SearchShopInput,
  ): Promise<SearchShopOutput> {
    return this.shopService.searchShopByName(searchShopInput);
  }
}

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private readonly shopService: ShopService) {}

  @ResolveField((type) => Int)
  shopCount(@Parent() category: Category): Promise<number> {
    return this.shopService.countShops(category);
  }

  @Query((type) => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.shopService.allCategories();
  }

  @Query((type) => CategoryOutput)
  category(
    @Args('input') categoryInput: CategoryInput,
  ): Promise<CategoryOutput> {
    return this.shopService.findCategoryBySlug(categoryInput);
  }
}
