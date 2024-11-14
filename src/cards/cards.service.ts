import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Card } from "./entities/card.entity";

@Injectable()
export class CardsService {
  private cards: Card[] = [
    {
      id: 1,
      name: "2024 Topps Chrome Mike Trout # 134",
      brand: "Topps",
      sport: ["baseball"],
    },
  ];

  findAll() {
    return this.cards;
  }

  findOne(id: string) {
    const card = this.cards.find((item) => item.id === +id);
    if (!card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return card;
  }

  create(createCardDto: any) {
    this.cards.push(createCardDto);
  }

  update(id: string, updateCardDto: any) {
    const existingCard = this.findOne(id);
    if (existingCard) {
      // update the existing entity luln0000nn00
    }
  }
  remove(id: string) {
    const cardIndex = this.cards.findIndex((item) => item.id === +id);
    if (cardIndex >= 0) {
      this.cards.splice(cardIndex, 1);
    }
  }
}
