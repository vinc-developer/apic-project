import { Module } from '@nestjs/common';
import { AddressModule } from '../../beekeeping/address/address.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';

@Module({
  imports: [AddressModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
})
export class ClientModule {}
