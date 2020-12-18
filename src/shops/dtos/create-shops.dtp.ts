import { InputType, OmitType } from '@nestjs/graphql';
import { Shops } from '../entities/shops.entity';

@InputType()
export class CreateShopDto extends OmitType(Shops, ['id']) {}
