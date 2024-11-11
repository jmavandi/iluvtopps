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

@Controller("cards")
export class CardsController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all cards Limit: ${limit}, offset: ${offset}`;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return `This action returns ${id} card`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
    // return `this action creates a card`;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return `This actions updates #${id} card`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return `This action removes #${id} card`;
  }
}
