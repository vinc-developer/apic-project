import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HoneycropDto } from './dto/honeycrop.dto';
import { pool } from '../../../database/mysql.config';

@Injectable()
export class HoneycropRepository {
  SQL_INSERT = `INSERT INTO honeycrop SET name = ?, honey_kg = ?, nb_hausses = ?, id_beehive = ?`;
  SQL_UPDATE = `UPDATE honeycrop SET name = ?, honey_kg = ?, nb_hausses = ?, id_beehive = ? WHERE id = ?`;
  SQL_DELETE = `DELETE FROM honeycrop WHERE id = ?`;
  SQL_FIND_ONE = `SELECT * FROM honeycrop WHERE id = ?`;

  private readonly logger = new Logger(HoneycropRepository.name);

  /**
   *
   * @param honeycropDto
   */
  async create(honeycropDto: HoneycropDto) {
    try {
      return await pool.execute(this.SQL_INSERT, [
        honeycropDto.name,
        honeycropDto.honey_kg,
        honeycropDto.nb_hausses,
        honeycropDto.beehive.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting honeycrop data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  /**
   *
   * @param honeycropDto
   */
  async update(honeycropDto: HoneycropDto) {
    try {
      return await pool.execute(this.SQL_UPDATE, [
        honeycropDto.name,
        honeycropDto.honey_kg,
        honeycropDto.nb_hausses,
        honeycropDto.beehive.id,
        honeycropDto.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error updating honeycrop data', err.stack);
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
      this.logger.error('Error deleting honeycrop data', err.stack);
      throw new BadRequestException(
        `Erreur de suppression des données des données`,
      );
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
      this.logger.error('Error getting honeycrop data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }
}
