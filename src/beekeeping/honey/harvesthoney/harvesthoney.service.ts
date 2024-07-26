import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HarvesthoneyRepository } from './harvesthoney.repository';
import { HoneycropService } from '../honeycrop/honeycrop.service';
import { RelHarvestHoneycropDto } from './dto/relHarvestHoneycropDto.dto';
import { HarvesthoneyDto } from './dto/harvesthoney.dto';
import { HoneycropDto } from '../honeycrop/dto/honeycrop.dto';
import { HarvesthoneyByBeehiveDto } from './dto/harvesthoneyByBeehive.dto';
import { BeeyardDto } from '../../beeyard/dto/beeyard.dto';
import { HarvesthoneyByBeeyardDto } from './dto/harvesthoneyByBeeyard.dto';
import { BeekeeperDto } from '../../beekeeper/dto/beekeeper.dto';
import { AddressDto } from '../../address/dto/address.dto';
import { HarvesthoneyByBeekeeperDto } from './dto/harvesthoneyBeBeekeeper.dto';

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
  async createHoneycrop(
    harvesthoneyDto: HarvesthoneyDto,
  ): Promise<HarvesthoneyDto> {
    try {
      let id = harvesthoneyDto.id;
      let total_honey_kg = harvesthoneyDto.total_honey_kg;

      // controle si c'est la première récolte, si oui création du stockage
      if (!id || id === 0) {
        const [result] =
          await this.harvesthoneyRepository.create(harvesthoneyDto);
        id = (result as any).insertId;
        if (!id) {
          throw new HttpException(
            `Erreur dans la création de la récolte`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // création de la récolte
      const honeycrop: HoneycropDto = await this.honeycropService.create(
        harvesthoneyDto.honeycrops[0],
      );

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
  async update(harvesthoneyDto: HarvesthoneyDto): Promise<HarvesthoneyDto> {
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
      await this.harvesthoneyRepository.deleteRelHoneycrop(
        relHarvestHoneycropDto,
      );
      //suppression de la récolte
      return await this.honeycropService.delete(
        relHarvestHoneycropDto.idHoneycrop,
      );
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de toute les récoltes d'une ruche
   * @param idBeehive
   */
  async findAllByBeehive(idBeehive: number): Promise<HarvesthoneyByBeehiveDto> {
    try {
      const [rows] =
        await this.harvesthoneyRepository.findAllByBeehive(idBeehive);
      if (!rows) {
        return undefined;
      }

      const harvestHoneys: HarvesthoneyByBeehiveDto = {
        id: rows[0].id,
        date_harvest: rows[0].date_harvest,
        total_honey_kg: rows[0].total_honey_kg,
        total_sale_honey_kg: rows[0].total_sale_honey_kg,
        lot_number: rows[0].lot_number,
        storage: rows[0].storage,
        beehive: {
          id: rows[0].beehive_id,
          name: rows[0].beehive_name,
          bee_type: rows[0].bee_type,
          type_hive: rows[0].type_hive,
          beeyard: {
            id: rows[0].id_beeyard,
          } as BeeyardDto,
        },
        honeycrops: [],
      };

      for (const row of rows as any) {
        harvestHoneys.honeycrops.push({
          id: row.honeycrop_id,
          name: row.honeycrop_name,
          honey_kg: row.honey_kg,
          nb_hausses: row.nb_hausses,
        } as HoneycropDto);
      }

      return harvestHoneys;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de toutes les récolte d'un rucher
   * @param idBeeyard
   */
  async findAllByBeeyard(idBeeyard: number): Promise<HarvesthoneyByBeeyardDto> {
    try {
      const [rows] =
        await this.harvesthoneyRepository.findAllByBeeyard(idBeeyard);
      if (!rows) {
        return undefined;
      }

      const harvestHoneys: HarvesthoneyByBeeyardDto = {
        id: rows[0].id,
        date_harvest: rows[0].date_harvest,
        total_honey_kg: rows[0].total_honey_kg,
        total_sale_honey_kg: rows[0].total_sale_honey_kg,
        lot_number: rows[0].lot_number,
        storage: rows[0].storage,
        beeyard: {
          id: rows[0].id_beeyard,
          name: rows[0].beeyard_name,
          environment: rows[0].environment,
          address: {
            id: rows[0].beeyard_address,
          } as AddressDto,
          beekeeper: {
            id: rows[0].id_beekeeper,
          } as BeekeeperDto,
        },
        honeycrops: [],
      };

      for (const row of rows as any) {
        harvestHoneys.honeycrops.push({
          id: row.honeycrop_id,
          name: row.honeycrop_name,
          honey_kg: row.honey_kg,
          nb_hausses: row.nb_hausses,
          beehive: {
            id: row.beehive_id,
            name: row.beehive_name,
            bee_type: row.bee_type,
            type_hive: row.type_hive,
          },
        } as HoneycropDto);
      }

      return harvestHoneys;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de toute les récoltes d'un apiculteur
   * @param idBeekeeper
   */
  async findAllByBeekeeper(
    idBeekeeper: number,
  ): Promise<HarvesthoneyByBeekeeperDto> {
    try {
      const [rows] =
        await this.harvesthoneyRepository.findAllByBeekeeper(idBeekeeper);
      if (!rows) {
        return undefined;
      }

      const harvestHoneys: HarvesthoneyByBeekeeperDto = {
        id: rows[0].id,
        date_harvest: rows[0].date_harvest,
        total_honey_kg: rows[0].total_honey_kg,
        total_sale_honey_kg: rows[0].total_sale_honey_kg,
        lot_number: rows[0].lot_number,
        storage: rows[0].storage,
        beekeeper: {
          id: rows[0].beekeeper_id,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          siret: rows[0].siret,
          napi: rows[0].napi,
          email: rows[0].email,
          phone: rows[0].phone,
          address: {
            id: rows[0].beekeeper_address,
          } as AddressDto,
        },
        honeycrops: [],
      };

      for (const row of rows as any) {
        harvestHoneys.honeycrops.push({
          id: row.honeycrop_id,
          name: row.honeycrop_name,
          honey_kg: row.honey_kg,
          nb_hausses: row.nb_hausses,
          beehive: {
            id: row.beehive_id,
            name: row.beehive_name,
            bee_type: row.bee_type,
            type_hive: row.type_hive,
            beeyard: {
              id: row.beeyard_id,
              name: row.beeyard_name,
              environment: row.environment,
              address: {
                id: row.beeyard_address,
              } as AddressDto,
            },
          },
        } as HoneycropDto);
      }

      return harvestHoneys;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
