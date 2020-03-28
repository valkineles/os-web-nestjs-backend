import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getFilters } from 'src/middlewares/filters.middlewares';

import { usersSchema } from './../users/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: usersSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(getFilters)
      .forRoutes({ path: 'api/v1/users', method: RequestMethod.GET });
  }
}
