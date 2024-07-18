import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { pool } from '../../database/mysql.config';

@Injectable()
export class AddressRepository {
  SQL_INSERT = `INSERT INTO address SET street = ?, additional_address = ?, zipcode = ?, city = ?, state = ?, country = ?`;
  SQL_UPDATE = `UPDATE address SET street = ?, additional_address = ?, zipcode = ?, city = ?, state = ?, country = ? WHERE id = ?`;
  SQL_DELETE = `DELETE FROM address WHERE id = ?`;
  SQL_FIND_ONE = `SELECT * FROM address WHERE id = ?`;

  private readonly logger: Logger = new Logger(AddressRepository.name);

  /**
   *
   * @param addressDto
   */
  async create(addressDto: AddressDto) {
    try {
      return await pool.execute(this.SQL_INSERT, [
        addressDto.street,
        addressDto.additional_address,
        addressDto.zipcode,
        addressDto.city,
        addressDto.state,
        addressDto.country,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting address data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  /**
   *
   * @param addressDto
   */
  async update(addressDto: AddressDto) {
    try {
      return await pool.execute(this.SQL_UPDATE, [
        addressDto.street,
        addressDto.additional_address,
        addressDto.zipcode,
        addressDto.city,
        addressDto.state,
        addressDto.country,
        addressDto.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error updating address data', err.stack);
      throw new BadRequestException(`Erreur de mise à jour des données`);
    }
  }

  /**
   *
   * @param id
   */
  async delete(id: number) {
    try {
      return pool.execute(this.SQL_DELETE, [id]);
    } catch (err: any) {
      this.logger.error('Error deleting address', err.stack);
      throw new BadRequestException(`Erreur de suppression de l'adresse`);
    }
  }

  /**
   *
   * @param id
   */
  async findOne(id: number) {
    try {
      return pool.execute(this.SQL_FIND_ONE, [id]);
    } catch (err: any) {
      this.logger.error('Error getting address data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }
}
