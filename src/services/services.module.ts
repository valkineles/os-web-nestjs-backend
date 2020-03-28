import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getFilters } from 'src/middlewares/filters.middlewares';

import { ServicesController } from './services.controller';
import { servicesSchema } from './services.schema';
import { ServicesService } from './services.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: servicesSchema }]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(getFilters)
      .forRoutes({ path: 'api/v1/services', method: RequestMethod.GET });
  }
}
