import { Module } from '@nestjs/common';
import { ApiculteurController } from './apiculteur.controller';
import { ApiculteurService } from './apiculteur.service';
import { ApiculteurRepository } from './apiculteur.repository';

@Module({
  imports: [],
  controllers: [ApiculteurController],
  providers: [ApiculteurService, ApiculteurRepository],
})
export class ApiculteurModule {}
