import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:manager@cluster0-nvogb.mongodb.net/webnelson?retryWrites=true&w=majority',
    ),
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
