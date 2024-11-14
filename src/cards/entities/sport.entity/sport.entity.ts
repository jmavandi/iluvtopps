import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "../card.entity";

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Card, (card) => card.sport)
  cards: Card[];
}
