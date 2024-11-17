import { DataSource } from "typeorm";
import { CardRefactor1731721635172 } from "./src/migrations/1731721635172-CardRefactor";
import { Sport } from "src/cards/entities/sport.entity";
import { Card } from "src/cards/entities/card.entity";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pass123",
  database: "postgres",
  entities: [Card, Sport],
  migrations: [CardRefactor1731721635172],
});
