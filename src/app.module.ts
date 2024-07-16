import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiculteurModule } from './apiculture/apiculteur/apiculteur/apiculteur.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiculteurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
