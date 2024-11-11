import { PartialType } from "@nestjs/mapped-types";
import { CreateCardDto } from "../create-card.dto/create-card.dto";

export class UpdateCardDto extends PartialType(CreateCardDto) {}
