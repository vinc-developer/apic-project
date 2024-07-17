import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BeekeeperDto } from './dto/beekeeper.dto';
import { Beekeeper } from './interfaces/beekeeper.interface';
import { pool } from '../../database/mysql.config';

@Injectable()
export class BeekeeperRepository {
  SQL_INSERT = `INSERT INTO beekeeper set firstname = ?, lastname = ?, siret = ?, napi = ?, email = ?, phone = ?`;
  SQL_FIND_ALL = `SELECT * from beekeeper`;
  SQL_FIND_ONE = `SELECT b.*, a.id as address_id, a.street, a.additional_address, a.zipcode, a.city, a.state, a.country from beekeeper b LEFT JOIN address a ON b.id_address = a.id WHERE b.id = ?`;
  SQL_UPDATE = `UPDATE beekeeper SET firstname = ?, lastname = ?, siret = ?, napi = ?, email = ?, phone = ? WHERE id = ?`;
  SQL_DELETE = `DELETE FROM beekeeper WHERE id = ?`;

  private readonly logger = new Logger(BeekeeperRepository.name);

  async findAll() {
    try {
      return await pool.execute(this.SQL_FIND_ALL);
    } catch (err: any) {
      this.logger.error('Error getting beekeeper data', err.stack);
      throw new BadRequestException(`Erreur lors de la récupération des données`);
    }
  }

  async findOne(id: number) {
    try {
      return await pool.execute(this.SQL_FIND_ONE, [id]);
    } catch (err: any) {
      this.logger.error('Error getting beekeeper data', err.stack);
      throw new BadRequestException(`Erreur lors de la récupération des données`);
    }
  }

  async create(beekeeperDto: BeekeeperDto) {
    try {
      return await pool.execute(this.SQL_INSERT, [
        beekeeperDto.firstname,
        beekeeperDto.lastname,
        beekeeperDto.siret,
        beekeeperDto.napi,
        beekeeperDto.email,
        beekeeperDto.phone,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting beekeeper data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  async update(beekeeper: Beekeeper) {
    try {
      return await pool.execute(this.SQL_UPDATE, [
        beekeeper.firstname,
        beekeeper.lastname,
        beekeeper.siret,
        beekeeper.napi,
        beekeeper.email,
        beekeeper.phone,
        beekeeper.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error updating beekeeper data', err.stack);
      throw new BadRequestException(`Erreur de mise à jour des données`);
    }
  }

  async delete(id: number){
    try {
      return await pool.execute(this.SQL_DELETE, [id]);
    } catch (err: any) {
      this.logger.error('Error deleting beekeeper', err.stack);
      throw new BadRequestException(`Erreur de suppression de l'apiculteur`);
    }
  }
}
