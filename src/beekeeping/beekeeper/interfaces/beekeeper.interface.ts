import { Address } from '../../address/interfaces/address.interface';

export interface Beekeeper {
  id: number;
  lastname: string;
  firstname: string;
  siret: string;
  napi: string;
  email: string;
  phone: string;
  address: Address;
}
