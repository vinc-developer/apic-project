import { Beeyard } from '../../beeyard/interfaces/beeyard.interface';

export interface Beehive {
  id: number;
  bee_type: string;
  name: string;
  type_hive: string;
  beeyard: Beeyard;
}
