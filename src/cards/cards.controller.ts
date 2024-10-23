import { Controller, Get } from '@nestjs/common';

@Controller('cards')
export class CardsController {
  @Get()
  findAll() {
    return 'this action returns all the cards';
  }
}
