import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { BeeyardDto } from '../../beekeeping/beeyard/dto/beeyard.dto';
import { HarvesthoneyDto } from '../../beekeeping/honey/harvesthoney/dto/harvesthoney.dto';
import { HoneycropDto } from '../../beekeeping/honey/honeycrop/dto/honeycrop.dto';
import { BeehiveDto } from '../../beekeeping/beehive/dto/beehive.dto';
import { AddressDto } from '../../beekeeping/address/dto/address.dto';
import { BeekeeperDto } from '../../beekeeping/beekeeper/dto/beekeeper.dto';
import { TrackingDto } from './dto/tracking.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Création d'un produit
   * @param productDto
   */
  async create(productDto: ProductDto): Promise<ProductDto> {
    try {
      const [result] = await this.productRepository.create(productDto);
      const id = (result as any).insertId;
      if (!id) {
        throw new HttpException(
          `Erreur dans la création du client`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        id: id,
        price: productDto.price,
        type: productDto.type,
        weight: productDto.weight,
        quantity: productDto.quantity,
        quantity_sale: productDto.quantity_sale,
        lot_number: productDto.lot_number,
        DLUO: productDto.DLUO,
        date_packaging: productDto.date_packaging,
        harvesthoney: {
          id: productDto.harvesthoney.id,
        },
      } as ProductDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jour du produit
   * @param productDto
   */
  async update(productDto: ProductDto): Promise<ProductDto> {
    try {
      await this.productRepository.update(productDto);
      return productDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'un produit
   * @param id
   */
  async delete(id: number) {
    try {
      return await this.productRepository.delete(id);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération d'un produit
   * @param id
   */
  async findOne(id: number): Promise<ProductDto> {
    try {
      const [row] = await this.productRepository.findOne(id);
      if (!row) {
        return undefined;
      }

      return await this.mapperProductDto(row);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de tout les produits créé
   */
  async findAll(): Promise<ProductDto[]> {
    try {
      const [rows] = await this.productRepository.findAll();
      if (!rows) {
        return undefined;
      }

      return await this.mapperListProductDto(rows);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de tout les produits d'une récolte
   * @param idHarvesthoney
   */
  async findAllByHarvesthoney(idHarvesthoney: number): Promise<ProductDto[]> {
    try {
      const [rows] =
        await this.productRepository.findAllByHarvesthoney(idHarvesthoney);
      if (!rows) {
        return undefined;
      }

      return await this.mapperListProductDto(rows);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de tout les produits d'un apiculteur
   * @param idBeekeeper
   */
  async findAllByBeekeeper(idBeekeeper: number): Promise<ProductDto[]> {
    try {
      const [rows] =
        await this.productRepository.findAllByBeekeeper(idBeekeeper);
      if (!rows) {
        return undefined;
      }

      return await this.mapperListProductDto(rows);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Permet de tracé l'histoire d'un produit
   * @param id
   */
  async getTracking(id: number): Promise<TrackingDto> {
    try {
      const [rows] = await this.productRepository.getTracking(id);
      if (!rows) {
        return undefined;
      }

      const row = rows[0] as any;

      const product: ProductDto = {
        id: row.id,
        price: row.price,
        type: row.type,
        weight: row.weight,
        quantity: row.quantity,
        quantity_sale: row.quantity_sale,
        lot_number: row.lot_number,
        DLUO: row.DLUO,
        date_packaging: row.date_packaging,
      } as ProductDto;

      const harvesthoney: HarvesthoneyDto = {
        id: row.harvesthoney_id,
        date_harvest: row.date_harvest,
        total_honey_kg: row.total_honey_kg,
        total_sale_honey_kg: row.total_sale_honey_kg,
        lot_number: row.lot_number,
        storage: row.storage,
      } as HarvesthoneyDto;

      const honeycrops: HoneycropDto[] = [];
      const beehives: BeehiveDto[] = [];
      const beeyards: BeeyardDto[] = [];
      const beekeepers: BeekeeperDto[] = [];

      for (const honeycrop of row.honeycrops as any) {
        if (!honeycrops.find((el) => el.id === honeycrop.honeycrop_id)) {
          honeycrops.push({
            id: honeycrop.honeycrop_id,
            name: honeycrop.honeycrop_name,
            honey_kg: honeycrop.honey_kg,
            nb_hausses: honeycrop.nb_hausses,
          } as HoneycropDto);
        }
        if (!beehives.find((el) => el.id === honeycrop.beehive.beehive_id)) {
          beehives.push({
            id: honeycrop.beehive.beehive_id,
            bee_type: honeycrop.beehive.bee_type,
            name: honeycrop.beehive.beehive_name,
            type_hive: honeycrop.beehive.type_hive,
          } as BeehiveDto);
        }
        if (!beeyards.find((el) => el.id === honeycrop.beeyard.beeyard_id)) {
          beeyards.push({
            id: honeycrop.beeyard.beeyard_id,
            name: honeycrop.beeyard.beeyard_name,
            environment: honeycrop.beeyard.environment,
            address: {
              id: honeycrop.address_beeyard.address_id,
              street: honeycrop.address_beeyard.street,
              additional_address: honeycrop.address_beeyard.additional_address,
              zipcode: honeycrop.address_beeyard.zipcode,
              city: honeycrop.address_beeyard.city,
              state: honeycrop.address_beeyard.state,
              country: honeycrop.address_beeyard.country,
            } as AddressDto,
          } as BeeyardDto);
        }
        if (
          !beekeepers.find((el) => el.id === honeycrop.beekeeper.beekeeper_id)
        ) {
          beekeepers.push({
            id: honeycrop.beekeeper.beekeeper_id,
            firstname: honeycrop.beekeeper.firstname,
            lastname: honeycrop.beekeeper.lastname,
            siret: honeycrop.beekeeper.siret,
            napi: honeycrop.beekeeper.napi,
            email: honeycrop.beekeeper.email,
            phone: honeycrop.beekeeper.phone,
            address: {
              id: honeycrop.address_beekeeper.address_id,
              street: honeycrop.address_beekeeper.street,
              additional_address:
                honeycrop.address_beekeeper.additional_address,
              zipcode: honeycrop.address_beekeeper.zipcode,
              city: honeycrop.address_beekeeper.city,
              state: honeycrop.address_beekeeper.state,
              country: honeycrop.address_beekeeper.country,
            } as AddressDto,
          } as BeekeeperDto);
        }
      }

      const trackingDto: TrackingDto = {
        productDto: product,
        harvesthoney: harvesthoney,
        honeycrop: honeycrops,
        beehive: beehives,
        beeyard: beeyards,
        beekeeper: beekeepers,
      };
      return trackingDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Méthode qui permet de mapper un tableau d'objet en une liste de ProductDto
   * @param rows
   * @private
   */
  private async mapperListProductDto(rows: any): Promise<ProductDto[]> {
    const products: ProductDto[] = [];

    for (const row of rows as any) {
      products.push(await this.mapperProductDto(row));
    }

    return products;
  }

  /**
   * methode qui permet de mapper un objet en ProductDto
   * @param row
   * @private
   */
  private async mapperProductDto(row: any): Promise<ProductDto> {
    return {
      id: row.id,
      price: row.price,
      type: row.type,
      weight: row.weight,
      quantity: row.quantity,
      quantity_sale: row.quantity_sale,
      lot_number: row.lot_number,
      DLUO: row.DLUO,
      date_packaging: row.date_packaging,
      harvesthoney: {
        id: row.id_harvesthoney,
      },
    } as ProductDto;
  }
}
