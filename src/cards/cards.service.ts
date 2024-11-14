import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Card } from "./entities/card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateCardDto } from "./dto/create-card.dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto/update-card.dto";
import { Sport } from "./entities/sport.entity/sport.entity";
import { Event } from "src/events/entities/event.entity/event.entity";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto/pagination-query.dto";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
    private readonly dataSource: DataSource
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.cardRepository.find({
      relations: {
        sport: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const card = await this.cardRepository.findOne({
      where: { id: +id },
      relations: {
        sport: true,
      },
    });
    if (!card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return card;
  }

  async create(createCardDto: CreateCardDto) {
    const sport = await Promise.all(
      createCardDto.sport.map((name) => this.preloadSportByName(name))
    );

    const card = this.cardRepository.create({
      ...createCardDto,
      sport,
    });
    return this.cardRepository.save(card);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const sport =
      updateCardDto.sport &&
      (await Promise.all(
        updateCardDto.sport.map((name) => this.preloadSportByName(name))
      ));

    const card = await this.cardRepository.preload({
      id: +id,
      ...updateCardDto,
      sport,
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

  async recommendCard(card: Card) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      card.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = "recommend_card";
      recommendEvent.type = "card";
      recommendEvent.payload = { cardId: card.id };

      await queryRunner.manager.save(card);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadSportByName(name: string): Promise<Sport> {
    const existingSport = await this.sportRepository.findOne({
      where: { name },
    });
    if (existingSport) {
      return existingSport;
    }
    return this.sportRepository.create({ name });
  }
}
