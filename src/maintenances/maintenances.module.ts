import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getFilters } from 'src/middlewares/filters.middlewares';

import { MaintenancesController } from './maintenances.controller';
import { MaintenancesService } from './maintenances.service';
import { maintenancesSchema } from './mantenances.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Maintenance', schema: maintenancesSchema },
    ]),
  ],
  controllers: [MaintenancesController],
  providers: [MaintenancesService],
})
export class MaintenancesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(getFilters)
      .forRoutes({ path: 'api/v1/products', method: RequestMethod.GET });
  }
}
