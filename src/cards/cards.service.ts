import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Card } from "./entities/card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCardDto } from "./dto/create-card.dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto/update-card.dto";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>
  ) {}

  findAll() {
    return this.cardRepository.find();
  }

  async findOne(id: string) {
    const card = await this.cardRepository.findOne({ where: { id: +id } });
    if (!card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return card;
  }

  create(createCardDto: CreateCardDto) {
    const card = this.cardRepository.create(createCardDto);
    return this.cardRepository.save(card);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.cardRepository.preload({
      id: +id,
      ...updateCardDto,
    });
    if (!card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return this.cardRepository.save(card);
  }
  async remove(id: string) {
    const card = await this.findOne(id);
    return this.cardRepository.remove(card);
  }
}
