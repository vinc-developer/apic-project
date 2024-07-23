import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ClientDto } from './dto/client.dto';
import { pool } from '../../database/mysql.config';

@Injectable()
export class ClientRepository {
  SQL_INSERT = `INSERT INTO client SET firstname = ?, lastname = ?, email = ?, phone = ?, id_address = ?`;
  SQL_UPDATE = `UPDATE client SET firstname = ?, lastname = ?, email = ?, phone = ?, id_address = ? WHERE id = ?`;
  SQL_DELETE = `DELETE FROM client WHERE id = ?`;
  SQL_FIND_ONE = `SELECT c.*,  a.street, a.additional_address, a.zipcode, a.city, a.state, a.country
          FROM client c
          INNER JOIN address a ON c.id_address = a.id
          WHERE c.id = ?`;

  private readonly logger = new Logger(ClientRepository.name);

  /**
   *
   * @param clientDto
   * @param idAddress
   */
  async create(clientDto: ClientDto, idAddress: number) {
    try {
      return await pool.execute(this.SQL_INSERT, [
        clientDto.firstname,
        clientDto.lastname,
        clientDto.email,
        clientDto.phone,
        idAddress,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting client data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  /**
   *
   * @param clientDto
   */
  async update(clientDto: ClientDto) {
    try {
      return await pool.execute(this.SQL_UPDATE, [
        clientDto.firstname,
        clientDto.lastname,
        clientDto.email,
        clientDto.phone,
        clientDto.address.id,
        clientDto.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error updating client data', err.stack);
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
      this.logger.error('Error deleting client', err.stack);
      throw new BadRequestException(`Erreur de suppression du client`);
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
      this.logger.error('Error getting client data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }
}
