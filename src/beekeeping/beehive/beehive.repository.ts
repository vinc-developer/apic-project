import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BeehiveDto } from './dto/beehive.dto';
import { pool } from '../../database/mysql.config';

@Injectable()
export class BeehiveRepository {
  SQL_INSERT = `INSERT INTO beehive SET bee_type = ?, name = ?, type_hive = ?, id_beeyard = ?`;
  SQL_UPDATE = `UPDATE beehive SET bee_type = ?, name = ?, type_hive = ?, id_beeyard = ? WHERE id = ?`;
  SQL_DELETE = `DELETE FROM beehive WHERE id = ?`;
  SQL_FIND_ONE = `SELECT * FROM beehive WHERE id = ?`;
  SQL_FIND_ALL_BY_BEEYARD = `SELECT * FROM beehive bh
                      INNER JOIN beeyard be ON bh.id_beeyard = be.id
                      WHERE be.id = ?`;
  SQL_FIND_ALL_BY_BEEKEEPER = `SELECT * FROM beehive bh
                      INNER JOIN beeyard be ON bh.id_beeyard = be.id
                      INNER JOIN beekeeper bk ON be.id_beekeeper = bk.id
                      WHERE bk.id = ?`;

  private readonly logger = new Logger(BeehiveRepository.name);

  /**
   *
   * @param beehiveDto
   */
  async create(beehiveDto: BeehiveDto) {
    try {
      return await pool.execute(this.SQL_INSERT, [
        beehiveDto.bee_type,
        beehiveDto.name,
        beehiveDto.type_hive,
        beehiveDto.beeyard.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting beehive data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  /**
   *
   * @param beehiveDto
   */
  async update(beehiveDto: BeehiveDto) {
    try {
      return await pool.execute(this.SQL_UPDATE, [
        beehiveDto.bee_type,
        beehiveDto.name,
        beehiveDto.type_hive,
        beehiveDto.beeyard.id,
        beehiveDto.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error updating beehive data', err.stack);
      throw new BadRequestException(`Erreur de mise à jour des données des données`);
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
      this.logger.error('Error deleting beehive data', err.stack);
      throw new BadRequestException(`Erreur de suppression des données des données`);
    }
  }

  /**
   *
   * @param id
   */
  async findOne(id: number) {
    try {
      return await pool.execute(this.SQL_FIND_ONE, [id]);
    } catch (err: any) {
      this.logger.error('Error getting beehive data', err.stack);
      throw new BadRequestException(`Erreur lors de la récupération des données`);
    }
  }

  /**
   *
   * @param id
   */
  async findAllByBeeyard(id: number) {
    try {
      return await pool.execute(this.SQL_FIND_ALL_BY_BEEYARD, [id]);
    } catch (err: any) {
      this.logger.error('Error getting by beeyard beehive data', err.stack);
      throw new BadRequestException(`Erreur lors de la récupération des données`);
    }
  }

  /**
   *
   * @param id
   */
  async findAllByBeekeeper(id: number) {
    try {
      return await pool.execute(this.SQL_FIND_ALL_BY_BEEKEEPER, [id]);
    } catch (err: any) {
      this.logger.error('Error getting by beekeeper beehive data', err.stack);
      throw new BadRequestException(`Erreur lors de la récupération des données`);
    }
  }
}
