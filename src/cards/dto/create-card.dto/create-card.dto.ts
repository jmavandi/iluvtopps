import { IsString } from "class-validator";
import { DeepPartial } from "typeorm";

export class CreateCardDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString()
  readonly sport?: DeepPartial<string[]>;
}
