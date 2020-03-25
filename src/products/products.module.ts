import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getFilters } from 'src/middlewares/filters.middlewares';

import { ProductsController } from './products.controller';
import { productsSchema } from './products.schema';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productsSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(getFilters)
      .forRoutes({ path: 'api/v1/products', method: RequestMethod.GET });
  }
}
