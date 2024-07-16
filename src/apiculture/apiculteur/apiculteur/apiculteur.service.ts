import { Injectable } from '@nestjs/common';
import { ApiculteurDto } from './dto/apiculteur.dto';
import { Apiculteur } from './interfaces/apiculteur.interface';
import { ApiculteurRepository } from './apiculteur.repository';

@Injectable()
export class ApiculteurService {
  private readonly apiculteurs: Apiculteur[] = [
    {
      id: 1,
      lastname: 'Alain',
      firstname: 'Terrieur',
      email: 'alain@terrieur.com',
      phone: '0606060606',
      napi: 'A5112774',
      siret: '12345678900012',
    },
    {
      id: 2,
      lastname: 'Alex',
      firstname: 'Terrieur',
      email: 'alex@terrieur.com',
      phone: '0707070707',
      napi: 'A5112885',
      siret: '78945612300014',
    },
  ];

  constructor(private readonly apiculteurRepository: ApiculteurRepository) {}

  async findAll() {
    const [rows] = await this.apiculteurRepository.findAll();
    return rows;
  }

  async findOne(id: number) {
    const [apiculteur] = await this.apiculteurRepository.findOne(id);
    return apiculteur;
  }

  async create(apiculteurDto: ApiculteurDto): Promise<Apiculteur> {
    try {
      const result = this.apiculteurRepository.create(apiculteurDto);
      const id = (result as any).insertId;
      return { id, ...apiculteurDto };
    } catch (err) {
      console.log(err);
    }
  }

  async update(apiculteur: Apiculteur) {
    try {
      await this.apiculteurRepository.update(apiculteur);
      return apiculteur;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id: number) {
    const [deleteApiculteur] = await this.apiculteurRepository.delete(id);
    return deleteApiculteur;
  }
}
