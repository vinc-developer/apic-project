import { Address } from '../../../beekeeping/address/interfaces/address.interface';

export interface Client {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  address: Address;
}
