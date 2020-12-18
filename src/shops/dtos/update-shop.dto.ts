import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateShopDto } from './create-shops.dtp';

@InputType()
class UpdataShopInputType extends PartialType(CreateShopDto) {}

@InputType()
export class UpdateShopDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdataShopInputType)
  data: UpdataShopInputType;
}
