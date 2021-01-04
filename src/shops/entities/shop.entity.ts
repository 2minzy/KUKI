import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Category } from './category.entity';
import { Dish } from './dish.entity';

@InputType('ShopInputType', { isAbstract: true }) // isAbtract means 이걸 복사해서 어딘가 쓴다. extend한다는 개념 e.g. dto에서 이용
@ObjectType() // graphQL Schema
@Entity() // TypeORM DB model
export class Shop extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.shops, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.shops, { onDelete: 'CASCADE' })
  owner: User;

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.shop)
  orders: Order[];

  @RelationId((shop: Shop) => shop.owner)
  ownerId: number;

  @Field((type) => [Dish])
  @OneToMany((type) => Dish, (dish) => dish.shop)
  menu: Dish[];
}
