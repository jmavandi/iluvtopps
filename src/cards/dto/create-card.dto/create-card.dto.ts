import { IsOptional, IsString } from "class-validator";
import { DeepPartial } from "typeorm";

export class CreateCardDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString({ each: true })
  readonly sport: string[];
}
