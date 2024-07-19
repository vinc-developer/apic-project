import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BeekeeperModule } from './beekeeping/beekeeper/beekeeper.module';
import { AddressModule } from './beekeeping/address/address.module';
import { BeeyardModule } from './beekeeping/beeyard/beeyard.module';
import { BeehiveModule } from './beekeeping/beehive/beehive.module';
import { HoneycropModule } from './beekeeping/honey/honeycrop/honeycrop.module';
import { HarvesthoneyModule } from './beekeeping/honey/harvesthoney/harvesthoney.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BeekeeperModule,
    AddressModule,
    BeeyardModule,
    BeehiveModule,
    HoneycropModule,
    HarvesthoneyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
