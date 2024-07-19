import { Module } from '@nestjs/common';
import { HarvesthoneyController } from './harvesthoney.controller';
import { HarvesthoneyService } from './harvesthoney.service';
import { HarvesthoneyRepository } from './harvesthoney.repository';
import { HoneycropModule } from '../honeycrop/honeycrop.module';

@Module({
  imports: [HoneycropModule],
  controllers: [HarvesthoneyController],
  providers: [HarvesthoneyService, HarvesthoneyRepository],
})
export class HarvesthoneyModule {}
