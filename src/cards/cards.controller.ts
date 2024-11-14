import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto/update-card.dto";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto/pagination-query.dto";

@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.cardsService.findAll(paginationQuery);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cardsService.findOne(id);
  }

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cardsService.remove(id);
  }
}
