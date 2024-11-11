import { IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString()
  readonly sport: string;
}
