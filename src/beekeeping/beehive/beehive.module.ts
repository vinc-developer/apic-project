import { Module } from '@nestjs/common';
import { BeehiveController } from './beehive.controller';
import { BeehiveService } from './beehive.service';
import { BeehiveRepository } from './beehive.repository';

@Module({
  controllers: [BeehiveController],
  providers: [BeehiveService, BeehiveRepository],
})
export class BeehiveModule {}
