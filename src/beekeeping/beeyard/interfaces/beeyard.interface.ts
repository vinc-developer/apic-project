import { Beekeeper } from '../../beekeeper/interfaces/beekeeper.interface';
import { Address } from '../../address/interfaces/address.interface';

export interface Beeyard {
  id: number;
  environment: string;
  name: string;
  beekeeper: Beekeeper;
  address: Address;
}
