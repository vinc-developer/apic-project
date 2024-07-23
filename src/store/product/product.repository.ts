import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { pool } from '../../database/mysql.config';

@Injectable()
export class ProductRepository {
  SQL_INSERT = `INSERT INTO product SET price = ?, type = ?, weight = ?, quantity = ?, quantity_sale = ?, lot_number = ?, DLUO = ?, date_packaging = ?, id_harvesthoney = ?`;
  SQL_UPDATE = `UPDATE product SET price = ?, type = ?, weight = ?, quantity = ?, quantity_sale = ?, lot_number = ?, DLUO = ?, date_packaging = ?, id_harvesthoney = ? WHERE id = ?`;
  SQL_DELETE = `DELETE FROM product WHERE id = ?`;

  FIND_ONE = `SELECT * FROM product WHERE id = ?`;
  FIND_ALL = `SELECT * FROM product`;
  FIND_ALL_BY_HARVESTHONEY = `SELECT DISTINCT p.* 
                      FROM product p 
                      INNER JOIN harvesthoney h ON p.id_harvesthoney = h.id
                      WHERE h.id = ?`;

  FIND_ALL_BY_BEEKEEPER = `SELECT DISTINCT p.* 
                      FROM product p 
                      INNER JOIN harvesthoney h ON p.id_harvesthoney = h.id
                      INNER JOIN rel_harvesthoney_honeycrop relhh ON relhh.id_harvesthoney = h.id
                      INNER JOIN honeycrop hc ON relhh.id_honeycrop = hc.id
                      INNER JOIN beehive be ON hc.id_beehive = be.id
                      INNER JOIN beeyard bya ON be.id_beeyard = bya.id
                      INNER JOIN beekeeper bk ON bya.id_beekeeper = bk.id
                      WHERE bk.id = ?`;

  GET_TRACKING_PRODUCT = `SELECT p.*,
                     h.id as harvesthoney_id, h.date_harvest, h.total_honey_kg, h.total_sale_honey_kg, h.lot_number as harvesthoney_lot_number, h.storage,
                     hc.id as honeycrop_id, hc.name as honeycrop_name, hc.honey_kg, hc.nb_hausses,
                     be.id as beehive_id, be.name as beehive_name, be.bee_type, be.type_hive,
                     bya.id as beeyard_id, bya.environment, bya.name as beeyard_name, bya.id_address as beeyard_address,
                     bk.id as beekeeper_id, bk.firstname, bk.lastname, bk.siret, bk.napi, bk.email, bk.phone, bk.id_address as beekeeper_address
                     FROM product p
                     INNER JOIN harvesthoney h ON p.id_harvesthoney = h.id
                     INNER JOIN rel_harvesthoney_honeycrop relhh ON relhh.id_harvesthoney = h.id
                     INNER JOIN honeycrop hc ON relhh.id_honeycrop = hc.id
                     INNER JOIN beehive be ON hc.id_beehive = be.id
                     INNER JOIN beeyard bya ON be.id_beeyard = bya.id
                     INNER JOIN beekeeper bk ON bya.id_beekeeper = bk.id 
                     WHERE p.id = ?`;

  private readonly logger = new Logger(ProductRepository.name);

  /**
   *
   * @param productDto
   */
  async create(productDto: ProductDto) {
    try {
      return pool.execute(this.SQL_INSERT, [
        productDto.price,
        productDto.type,
        productDto.weight,
        productDto.quantity,
        productDto.quantity_sale,
        productDto.lot_number,
        productDto.DLUO,
        productDto.date_packaging,
        productDto.harvesthoney.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error inserting prodcut data', err.stack);
      throw new BadRequestException(`Erreur d'insertion des données`);
    }
  }

  /**
   *
   * @param productDto
   */
  async update(productDto: ProductDto) {
    try {
      return pool.execute(this.SQL_UPDATE, [
        productDto.price,
        productDto.type,
        productDto.weight,
        productDto.quantity,
        productDto.quantity_sale,
        productDto.lot_number,
        productDto.DLUO,
        productDto.date_packaging,
        productDto.harvesthoney.id,
        productDto.id,
      ]);
    } catch (err: any) {
      this.logger.error('Error updating product data', err.stack);
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
      this.logger.error('Error deleting product data', err.stack);
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
      return await pool.execute(this.FIND_ONE, [id]);
    } catch (err: any) {
      this.logger.error('Error getting product data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }

  async findAll() {
    try {
      return await pool.execute(this.FIND_ALL);
    } catch (err: any) {
      this.logger.error('Error getting all product data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }

  /**
   *
   * @param idHarvesthoney
   */
  async findAllByHarvesthoney(idHarvesthoney: number) {
    try {
      return await pool.execute(this.FIND_ALL_BY_HARVESTHONEY, [
        idHarvesthoney,
      ]);
    } catch (err: any) {
      this.logger.error(
        'Error getting product by harvesthoney data',
        err.stack,
      );
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
      return await pool.execute(this.FIND_ALL_BY_BEEKEEPER, [idBeekeeper]);
    } catch (err: any) {
      this.logger.error('Error getting product by beekeeper data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }

  /**
   *
   * @param id
   */
  async getTracking(id: number) {
    try {
      return await pool.execute(this.GET_TRACKING_PRODUCT, [id]);
    } catch (err: any) {
      this.logger.error('Error getting tracking data', err.stack);
      throw new BadRequestException(
        `Erreur lors de la récupération des données`,
      );
    }
  }
}
