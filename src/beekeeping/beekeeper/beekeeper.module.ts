import { Module } from '@nestjs/common';
import { BeekeeperController } from './beekeeper.controller';
import { BeekeeperRepository } from './beekeeper.repository';
import { BeekeeperService } from './beekeeper.service';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [AddressModule],
  controllers: [BeekeeperController],
  providers: [BeekeeperService, BeekeeperRepository],
})
export class BeekeeperModule {}
