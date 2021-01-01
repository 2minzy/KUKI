import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteShopInput {
  @Field((type) => Number)
  shopId: number;
}

@ObjectType()
export class DeleteShopOutput extends CoreOutput {}
