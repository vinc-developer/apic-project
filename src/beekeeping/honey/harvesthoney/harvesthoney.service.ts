import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HarvesthoneyRepository } from './harvesthoney.repository';
import { HoneycropService } from '../honeycrop/honeycrop.service';
import { RelHarvestHoneycropDto } from './dto/relHarvestHoneycropDto.dto';
import { HarvesthoneyDto } from './dto/harvesthoney.dto';
import { HoneycropDto } from '../honeycrop/dto/honeycrop.dto';

@Injectable()
export class HarvesthoneyService {
  constructor(
    private readonly harvesthoneyRepository: HarvesthoneyRepository,
    private readonly honeycropService: HoneycropService,
  ) {}

  /**
   * Création des récoltes et du stockage
   * @param harvesthoneyDto
   */
  async createHoneycrop(harvesthoneyDto: HarvesthoneyDto) {
    try {
      let id = harvesthoneyDto.id;
      let total_honey_kg = harvesthoneyDto.total_honey_kg;

      // controle si c'est la première récolte, si oui création du stockage
      if (!id || id === 0) {
        const [result] = await this.harvesthoneyRepository.create(harvesthoneyDto);
        id = (result as any).insertId;
        if (!id) {
          throw new HttpException( `Erreur dans la création de la récolte`, HttpStatus.BAD_REQUEST);
        }
      }

      // création de la récolte
      const honeycrop: HoneycropDto = await this.honeycropService.create(harvesthoneyDto.honeycrops[0]);

      // création de la relation entre le stockage et la récolte
      const relHarvesthoney: RelHarvestHoneycropDto = {
        idHarvestHoney: id,
        idHoneycrop: honeycrop.id,
      };
      await this.harvesthoneyRepository.createRelHoneycrop(relHarvesthoney);

      // mise à jour du nombres de kilo récoltés
      total_honey_kg += honeycrop.honey_kg;
      const harvesthoney: HarvesthoneyDto = {
        id: id,
        date_harvest: harvesthoneyDto.date_harvest,
        total_honey_kg: total_honey_kg,
        total_sale_honey_kg: harvesthoneyDto.total_sale_honey_kg,
        lot_number: harvesthoneyDto.lot_number,
        storage: harvesthoneyDto.storage,
        honeycrops: [honeycrop],
      };
      await this.update(harvesthoney);

      return harvesthoney;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jour des données de stockage des récoltes
   * @param harvesthoneyDto
   */
  async update(harvesthoneyDto: HarvesthoneyDto) {
    try {
      await this.harvesthoneyRepository.update(harvesthoneyDto);
      return harvesthoneyDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression du stockage si pplus de récolte
   * @param id
   */
  async deleteHarvesthoney(id: number) {
    try {
      return await this.harvesthoneyRepository.delete(id);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'une récolte et de son association au stockage
   * @param relHarvestHoneycropDto
   */
  async deleteHoneycrop(relHarvestHoneycropDto: RelHarvestHoneycropDto) {
    try {
      // suppression de la relation
      await this.harvesthoneyRepository.deleteRelHoneycrop(relHarvestHoneycropDto);
      //suppression de la récolte
      return await this.honeycropService.delete(relHarvestHoneycropDto.idHoneycrop);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de toute les récoltes d'une ruche
   * @param idBeehive
   */
  async findAllByBeehive(idBeehive: number) {
    try {
      const [rows] = await this.harvesthoneyRepository.findAllByBeehive(idBeehive);
      console.log(rows);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de toutes les récolte d'un rucher
   * @param idBeeyard
   */
  async findAllByBeeyard(idBeeyard: number) {
    try {
      const [rows] = await this.harvesthoneyRepository.findAllByBeehive(idBeeyard);
      console.log(rows);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de toute les récoltes d'un apiculteur
   * @param idBeekeeper
   */
  async findAllByBeekeeper(idBeekeeper: number) {
    try {
      const [rows] = await this.harvesthoneyRepository.findAllByBeehive(idBeekeeper);
      console.log(rows);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
