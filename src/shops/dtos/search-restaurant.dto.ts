import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Shop } from '../entities/shop.entity';

@InputType()
export class SearchShopInput extends PaginationInput {
  @Field((type) => String)
  query: string;
}

@ObjectType()
export class SearchShopOutput extends PaginationOutput {
  @Field((type) => [Shop], { nullable: true })
  shops?: Shop[];
}
