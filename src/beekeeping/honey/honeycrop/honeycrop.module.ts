import { Module } from '@nestjs/common';
import { HoneycropController } from './honeycrop.controller';
import { HoneycropService } from './honeycrop.service';
import { HoneycropRepository } from './honeycrop.repository';

@Module({
  controllers: [HoneycropController],
  providers: [HoneycropService, HoneycropRepository],
  exports: [HoneycropService],
})
export class HoneycropModule {}
