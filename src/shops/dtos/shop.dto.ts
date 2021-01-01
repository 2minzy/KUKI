import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Shop } from '../entities/shop.entity';

@InputType()
export class ShopInput {
  @Field((type) => Int)
  shopId: number;
}

@ObjectType()
export class ShopOutput extends CoreOutput {
  @Field((type) => Shop, { nullable: true })
  shop?: Shop;
}
