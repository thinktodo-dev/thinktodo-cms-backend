import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageJson from "../package.json";
import { allowlistDomains } from "./config/cors.config";
import { RequestMethod, VersioningType } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { NAME_API } from "./utils/api-constants";
import { AllExceptionFilter } from "./global.exception";

async function bootstrap() {

  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if(allowlistDomains.indexOf('*') !==-1){
      corsOptions = { origin: true }
    }else{
      if (allowlistDomains.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false } // disable CORS for this request
      }   
    }
  // reflect (enable) the requested origin in the CORS response
    callback(null, corsOptions) // callback expects two parameters: error and options
  } 
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn','verbose','log','verbose'],
    cors:corsOptionsDelegate
  });
  //Catch all exception
  app.useGlobalFilters(new AllExceptionFilter());
  //Version api
  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=',
  });

  //Parse cookie
  app.use(cookieParser());
  //Prefix api
  app.setGlobalPrefix(NAME_API, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
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
