import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateShopInput } from './create-shop.dto';

@InputType()
export class EditShopInput extends PartialType(CreateShopInput) {
  @Field((type) => Number)
  shopId: number;
}

@ObjectType()
export class EditShopOutput extends CoreOutput {}
