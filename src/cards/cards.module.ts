import { Module } from "@nestjs/common";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";

@Module({
  imports: [CardsModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
