import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import packageJson = require("../package.json");

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn','verbose','log','verbose'],
  });
  const config = new DocumentBuilder()
  .setTitle('THINKTODO CMS CORE')
  .setDescription('The CMS API description')
  .setVersion(packageJson.version)
  .addTag('CMS')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apiDocument', app, document);
  await app.listen(process.env.SERVER_PORT || 3000);
  console.log("THINKTODO CMS is ready with port " + process.env.SERVER_PORT);
  console.log("THINKTODO CMS API Document :/apiDocument" );
}
bootstrap();
