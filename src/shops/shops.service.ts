import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Like, Raw, Repository } from 'typeorm';
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
import { Category } from 'src/shops/entities/category.entity';
import { Shop } from './entities/shop.entity';
import { CategoryRepository } from './repositories/cateogory.repository';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shops: Repository<Shop>,
    @InjectRepository(Category)
    private readonly categories: CategoryRepository,
  ) {}

  async createShop(
    owner: User,
    createShopInput: CreateShopInput,
  ): Promise<CreateShopOutput> {
    try {
      const newShop = this.shops.create(createShopInput);
      newShop.owner = owner;
      const category = await this.categories.getOrCreate(
        createShopInput.categoryName,
      );
      newShop.category = category;
      await this.shops.save(newShop);
      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        error: 'Could not create shop',
      };
    }
  }

  async editShop(
    owner: User,
    editShopInput: EditShopInput,
  ): Promise<EditShopOutput> {
    try {
      const shop = await this.shops.findOne(editShopInput.shopId);
      if (!shop) {
        return {
          success: false,
          error: 'Shop not found',
        };
      }
      if (owner.id !== shop.ownerId) {
        return {
          success: false,
          error: "You can't edit a shop that you don't own",
        };
      }

      let category: Category = null;
      if (editShopInput.categoryName) {
        category = await this.categories.getOrCreate(
          editShopInput.categoryName,
        );
      }
      await this.shops.save([
        {
          id: editShopInput.shopId,
          ...editShopInput,
          ...(category && { category }),
        },
      ]);

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        error: 'Could not edit shop',
      };
    }
  }

  async deleteShop(
    owner: User,
    { shopId }: DeleteShopInput,
  ): Promise<DeleteShopOutput> {
    try {
      const shop = await this.shops.findOne(shopId);
      if (!shop) {
        return {
          success: false,
          error: 'Shop not found',
        };
      }
      if (owner.id !== shop.ownerId) {
        return {
          success: false,
          error: "You can't delete a shop that you don't own",
        };
      }
      await this.shops.delete(shopId);
      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        error: 'Could not delete shop.',
      };
    }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categories.find();
      return {
        success: true,
        categories,
      };
    } catch {
      return {
        success: false,
        error: 'Could not load categories',
      };
    }
  }
  countShops(category: Category) {
    return this.shops.count({ category });
  }
  async findCategoryBySlug({
    slug,
    page,
  }: CategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categories.findOne({ slug });
      if (!category) {
        return {
          success: false,
          error: 'Category not found',
        };
      }
      const shops = await this.shops.find({
        where: {
          category,
        },
        take: 25,
        skip: (page - 1) * 25,
      });
      const totalResults = await this.countShops(category);
      return {
        success: true,
        shops,
        category,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch {
      return {
        success: false,
        error: 'Could not load category',
      };
    }
  }

  async allShops({ page }: ShopsInput): Promise<ShopsOutput> {
    try {
      const [shops, totalResults] = await this.shops.findAndCount({
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        success: true,
        results: shops,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch {
      return {
        success: false,
        error: 'Could not load shops',
      };
    }
  }

  async findShopById({ shopId }: ShopInput): Promise<ShopOutput> {
    try {
      const shop = await this.shops.findOne(shopId);
      if (!shop) {
        return {
          success: false,
          error: 'Shop not found',
        };
      }
      return {
        success: true,
        shop,
      };
    } catch {
      return {
        success: false,
        error: 'Could not find shop',
      };
    }
  }

  async searchShopByName({
    query,
    page,
  }: SearchShopInput): Promise<SearchShopOutput> {
    try {
      const [shops, totalResults] = await this.shops.findAndCount({
        where: {
          // typeORM의 ILIKE는 일반 LIKE 다르게 대소문자 구분 없이 keyword를 search
          // Raw()는 raw query를 실행할 수 있게 해준다.
          name: Raw((name) => `${name} ILIKE '%${query}%'`),
        },
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        success: true,
        shops,
        totalResults,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch {
      return { success: false, error: 'Could not search for shops' };
    }
  }
}
