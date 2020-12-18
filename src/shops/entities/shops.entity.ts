import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true }) // isAbtract means 이걸 복사해서 어딘가 쓴다. extend한다는 개념 e.g. dto에서 이용
@ObjectType() // graphQL Schema
@Entity() // TypeORM DB model
export class Shops {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1)
  name: string;

  @Field((type) => Boolean, { nullable: true })
  @Column()
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @Column({ default: true })
  address: string;

  @Field((type) => String, { nullable: true })
  @Column()
  ownerName: string;

  @Field((type) => String, { defaultValue: 'korean' })
  @Column()
  categoryName: string;
}
