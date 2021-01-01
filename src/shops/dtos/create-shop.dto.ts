import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Shop } from '../entities/shop.entity';

@InputType()
export class CreateShopInput extends PickType(Shop, [
  'name',
  'coverImg',
  'address',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateShopOutput extends CoreOutput {}
