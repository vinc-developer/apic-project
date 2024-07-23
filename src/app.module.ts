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
import { ClientController } from './store/client/client.controller';
import { ClientService } from './store/client/client.service';
import { ClientModule } from './store/client/client.module';
import { ProductModule } from './store/product/product.module';

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
    ClientModule,
    ProductModule,
  ],
  controllers: [AppController, ClientController],
  providers: [AppService, ClientService],
})
export class AppModule {}
