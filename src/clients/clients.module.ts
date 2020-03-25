import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getFilters } from './../middlewares/filters.middlewares';
import { ClientsController } from './clients.controller';
import { ClientSchema } from './clients.schema';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(getFilters)
      .forRoutes({ path: 'api/v1/clients', method: RequestMethod.GET });
  }
}
