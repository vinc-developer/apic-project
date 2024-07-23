import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HarvesthoneyDto } from './dto/harvesthoney.dto';
import { RelHarvestHoneycropDto } from './dto/relHarvestHoneycropDto.dto';
import { pool } from '../../../database/mysql.config';

@Injectable()
export class HarvesthoneyRepository {
  SQL_INSERT = `INSERT INTO harvesthoney SET date_harvest = ?, total_honey_kg = ?, total_sale_honey_kg = ?, lot_number = ?, storage = ?`;
  SQL_UPDATE = `UPDATE harvesthoney SET date_harvest = ?, total_honey_kg = ?, total_sale_honey_kg = ?,  lot_number = ?, storage = ? WHERE id = ?`;
  SQL_DELETE = `DELETE FROM harvesthoney WHERE id = ?`;

  SQL_INSERT_REL_HARVEST_HONEY = `INSERT INTO rel_harvesthoney_honeycrop SET id_harvesthoney = ?, id_honeycrop = ?`;
  SQL_DELETE_REL_HARVEST_HONEY = `DELETE FROM rel_harvesthoney_honeycrop WHERE id_harvesthoney = ? AND id_honeycrop = ?`;

  SQL_FIND_ALL_BY_BEEHIVE = `SELECT DISTINCT hh.*, 
      hc.id as honeycrop_id, hc.name as honeycrop_name, hc.honey_kg, hc.nb_hausses,
      be.id as beehive_id, be.name as beehive_name, be.bee_type, be.type_hive, be.id_beeyard
      FROM harvesthoney hh
      INNER JOIN rel_harvesthoney_honeycrop relhh ON relhh.id_harvesthoney = hh.id
      INNER JOIN honeycrop hc ON relhh.id_honeycrop = hc.id
      INNER JOIN beehive be ON hc.id_beehive = be.id
      WHERE be.id = ?`;
  SQL_FIND_ALL_BY_BEEYARD = `SELECT DISTINCT hh.*, 
      hc.id as honeycrop_id, hc.name as honeycrop_name, hc.honey_kg, hc.nb_hausses,
      be.id as beehive_id, be.name as beehive_name, be.bee_type, be.type_hive,
      bya.id as beeyard_id, bya.environment, bya.name as beeyard_name, bya.id_beekeeper, bya.id_address as beeyard_address
      FROM harvesthoney hh
      INNER JOIN rel_harvesthoney_honeycrop relhh ON relhh.id_harvesthoney = hh.id
      INNER JOIN honeycrop hc ON relhh.id_honeycrop = hc.id
      INNER JOIN beehive be ON hc.id_beehive = be.id
      INNER JOIN beeyard bya ON be.id_beeyard = bya.id
      WHERE bya.id = ?`;
  SQL_FIND_ALL_BY_BEEKEEPER = `SELECT DISTINCT hh.*, 
      hc.id as honeycrop_id, hc.name as honeycrop_name, hc.honey_kg, hc.nb_hausses,
      be.id as beehive_id, be.name as beehive_name, be.bee_type, be.type_hive,
      bya.id as beeyard_id, bya.environment, bya.name as beeyard_name, bya.id_address as beeyard_address,
      bk.id as beekeeper_id, bk.firstname, bk.lastname, bk.siret, bk.napi, bk.email, bk.phone, bk.id_address as beekeeper_address
      FROM harvesthoney hh
      INNER JOIN rel_harvesthoney_honeycrop relhh ON relhh.id_harvesthoney = hh.id
      INNER JOIN honeycrop hc ON relhh.id_honeycrop = hc.id
      INNER JOIN beehive be ON hc.id_beehive = be.id
      INNER JOIN beeyard bya ON be.id_beeyard = bya.id
      INNER JOIN beekeeper bk ON bya.id_beekeeper = bk.id
      WHERE bk.id = ?`;

  private readonly logger = new Logger(HarvesthoneyRepository.name);

  /**
   *
   * @param harvesthoneyDto
   */
  async create(harvesthoneyDto: HarvesthoneyDto) {
    try {
      return pool.execute(this.SQL_INSERT, [
        harvesthoneyDto.date_harvest,
        harvesthoneyDto.total_honey_kg,
        harvesthoneyDto.total_sale_honey_kg,
        harvesthoneyDto.lot_number,
        harvesthoneyDto.storage,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting harvesthoney data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  /**
   *
   * @param relHarvesthoney
   */
  async createRelHoneycrop(relHarvesthoney: RelHarvestHoneycropDto) {
    try {
      return pool.execute(this.SQL_INSERT_REL_HARVEST_HONEY, [
        relHarvesthoney.idHarvestHoney,
        relHarvesthoney.idHoneycrop,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting relHarvesthoney data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  /**
   *
   * @param harvesthoneyDto
   */
  async update(harvesthoneyDto: HarvesthoneyDto) {
    try {
      return pool.execute(this.SQL_UPDATE, [
        harvesthoneyDto.date_harvest,
        harvesthoneyDto.total_honey_kg,
        harvesthoneyDto.total_sale_honey_kg,
        harvesthoneyDto.lot_number,
        harvesthoneyDto.storage,
        harvesthoneyDto.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error updating harvesthoney data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la mise à jour des données`,
      );
    }
  }

  /**
   *
   * @param id
   */
  async delete(id: number) {
    try {
      return await pool.execute(this.SQL_DELETE, [id]);
    } catch (err: any) {
      this.logger.error('Error deleting harvesthoney data', err.stack);
      throw new BadRequestException(
        `Erreur de suppression des données des données`,
      );
    }
  }

  /**
   *
   * @param relHarvesthoney
   */
  async deleteRelHoneycrop(relHarvesthoney: RelHarvestHoneycropDto) {
    try {
      return await pool.execute(this.SQL_DELETE_REL_HARVEST_HONEY, [
        relHarvesthoney.idHarvestHoney,
        relHarvesthoney.idHoneycrop,
      ]);
    } catch (err: any) {
      this.logger.error('Error deleting harvesthoney data', err.stack);
      throw new BadRequestException(
        `Erreur de suppression des données des données`,
      );
    }
  }

  /**
   *
   * @param idBeehive
   */
  async findAllByBeehive(idBeehive: number) {
    try {
      return await pool.execute(this.SQL_FIND_ALL_BY_BEEHIVE, [idBeehive]);
    } catch (err: any) {
      this.logger.error('Error getting harvesthoney data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }

  /**
   *
   * @param idBeeyard
   */
  async findAllByBeeyard(idBeeyard: number) {
    try {
      return await pool.execute(this.SQL_FIND_ALL_BY_BEEYARD, [idBeeyard]);
    } catch (err: any) {
      this.logger.error('Error getting harvesthoney data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }

  /**
   *
   * @param idBeekeeper
   */
  async findAllByBeekeeper(idBeekeeper: number) {
    try {
      return await pool.execute(this.SQL_FIND_ALL_BY_BEEKEEPER, [idBeekeeper]);
    } catch (err: any) {
      this.logger.error('Error getting harvesthoney data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }
}
