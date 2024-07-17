import { Module } from '@nestjs/common';
import { BeekeeperController } from './beekeeper.controller';
import { BeekeeperRepository } from './beekeeper.repository';
import { BeekeeperService } from './beekeeper.service';

@Module({
  imports: [],
  controllers: [BeekeeperController],
  providers: [BeekeeperService, BeekeeperRepository],
})
export class BeekeeperModule {}
