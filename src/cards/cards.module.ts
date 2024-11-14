import { Module } from "@nestjs/common";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { Sport } from "./entities/sport.entity/sport.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Card, Sport, Event])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
