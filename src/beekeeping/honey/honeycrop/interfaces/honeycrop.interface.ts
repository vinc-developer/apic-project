import { Beehive } from '../../../beehive/interfaces/beehive.interface';

export interface Honeycrop {
  id: number;
  name: string;
  honey_kg: number;
  nb_hausses: number;
  beehive: Beehive;
}
