import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Shop } from '../entities/shop.entity';

@InputType()
export class ShopsInput extends PaginationInput {}

@ObjectType()
export class ShopsOutput extends PaginationOutput {
  @Field((type) => [Shop], { nullable: true })
  results?: Shop[];
}
