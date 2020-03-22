import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const service = require('./firebase-adminsdk.json');

  admin.initializeApp({
    credential: admin.credential.cert(service),
    databaseURL: process.env.DATABASE_URL_FIREBASE,
  });
  const port: number = +process.env.PORT || 3300;
  await app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
  });
}
bootstrap();
