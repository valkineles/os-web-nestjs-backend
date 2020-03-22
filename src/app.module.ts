import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { JwtMiddleware } from './middlewares/JwtMiddleware.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGOOSE_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({ path: 'users/login', method: RequestMethod.POST }) // acho que isso não existia, mas só como exemplo
      .forRoutes(
        { path: 'produtos', method: RequestMethod.ALL },
        { path: 'clients', method: RequestMethod.ALL },
        { path: 'services', method: RequestMethod.ALL },
        { path: 'users', method: RequestMethod.ALL },
      );
  }
}
