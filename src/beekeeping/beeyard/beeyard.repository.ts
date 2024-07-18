import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BeekeeperRepository } from '../beekeeper/beekeeper.repository';
import { BeeyardDto } from './dto/beeyard.dto';
import { pool } from '../../database/mysql.config';

@Injectable()
export class BeeyardRepository {
  SQL_INSERT = `INSERT INTO beeyard SET environment = ?, name = ?, id_beekeeper = ?, id_address = ?`;
  SQL_UPDATE = `UPDATE beeyard SET environment = ?, name = ?, id_beekeeper = ?, id_address = ? 
                WHERE id = ?`;
  SQL_DELETE = `DELETE FROM beeyard WHERE id = ?`;
  SQL_FIND_ONE = `SELECT b.*, a.street, a.additional_address, a.zipcode, a.city, a.state, a.country 
                FROM beeyard b
                INNER JOIN address a ON b.id_address = a.id
                WHERE b.id = ?`;
  SQL_FIND_ALL_BEEKEEPER = `SELECT be.*, a.street, a.additional_address, a.zipcode, a.city, a.state, a.country
                FROM beeyard be 
                INNER JOIN beekeeper bk ON be.id_beekeeper = bk.id
                INNER JOIN address a ON be.id_address = a.id
                WHERE bk.id = ?`;

  private readonly logger = new Logger(BeekeeperRepository.name);

  /**
   *
   * @param beeyardDto
   * @param idAddress
   */
  async create(beeyardDto: BeeyardDto, idAddress: number) {
    try {
      return await pool.execute(this.SQL_INSERT, [
        beeyardDto.environment,
        beeyardDto.name,
        beeyardDto.beekeeper.id,
        idAddress,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting beeyard data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  /**
   *
   * @param beeyardDto
   */
  async update(beeyardDto: BeeyardDto) {
    try {
      return await pool.execute(this.SQL_UPDATE, [
        beeyardDto.environment,
        beeyardDto.name,
        beeyardDto.beekeeper.id,
        beeyardDto.address.id,
        beeyardDto.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error updating beeyard data', err.stack);
      throw new BadRequestException(`Erreur de mise à jour des données`);
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
      this.logger.error('Error deleting beeyard', err.stack);
      throw new BadRequestException(`Erreur de suppression du rucher`);
    }
  }

  /**
   *
   * @param id
   */
  async findAllByIdBeekeeper(id: number) {
    try {
      return await pool.execute(this.SQL_FIND_ALL_BEEKEEPER, [id]);
    } catch (err: any) {
      this.logger.error('Error getting all by beekeeper beeyard data', err.stack);
      throw new BadRequestException( `Erreur lors de la récupération des données`);
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
      this.logger.error('Error getting beeyard data', err.stack);
      throw new BadRequestException( `Erreur lors de la récupération des données`);
    }
  }
}
