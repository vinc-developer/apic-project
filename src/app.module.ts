import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BeekeeperModule } from './beekeeping/beekeeper/beekeeper.module';
import { AddressController } from './beekeeping/address/address.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BeekeeperModule,
  ],
  controllers: [AppController, AddressController],
  providers: [AppService],
})
export class AppModule {}
