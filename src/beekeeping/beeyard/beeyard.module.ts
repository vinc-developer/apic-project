import { Module } from '@nestjs/common';
import { AddressModule } from '../address/address.module';
import { BeeyardRepository } from './beeyard.repository';
import { BeeyardService } from './beeyard.service';
import { BeeyardController } from './beeyard.controller';

@Module({
  imports: [AddressModule],
  controllers: [BeeyardController],
  providers: [BeeyardService, BeeyardRepository],
})
export class BeeyardModule {}
