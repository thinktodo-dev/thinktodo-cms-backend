import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn','verbose','log','verbose'],
  });
  await app.listen(process.env.SERVER_PORT || 3000);
  console.log("THINKTODO CMS is ready with port " + process.env.SERVER_PORT);
}
bootstrap();
