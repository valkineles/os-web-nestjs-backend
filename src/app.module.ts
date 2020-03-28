import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { JwtMiddleware } from './middlewares/JwtMiddleware.middleware';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGOOSE_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    ClientsModule,
    ProductsModule,
    UsersModule,
    ServicesModule,
    MaintenancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({ path: 'users/login', method: RequestMethod.POST })
      .forRoutes(
        { path: 'api/v1/products', method: RequestMethod.ALL },
        { path: 'api/v1/clients', method: RequestMethod.ALL },
        { path: 'api/v1/services', method: RequestMethod.ALL },
        { path: 'api/v1/users', method: RequestMethod.ALL },
        { path: 'api/v1/maintenance', method: RequestMethod.ALL },
      );
  }
}
