import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BeeyardRepository } from './beeyard.repository';
import { AddressService } from '../address/address.service';
import { BeeyardDto } from './dto/beeyard.dto';
import { AddressDto } from '../address/dto/address.dto';

@Injectable()
export class BeeyardService {
  constructor(
    private readonly beeyardRepository: BeeyardRepository,
    private readonly addressService: AddressService,
  ) {}

  /**
   * création d'un rucher et de son adresse
   * @param beeyardDto
   */
  async create(beeyardDto: BeeyardDto) {
    try {
      const addressDto: AddressDto = await this.addressService.create(
        beeyardDto.address,
      );

      const [result] = await this.beeyardRepository.create(
        beeyardDto,
        addressDto.id,
      );
      const id = (result as any).insertId;
      if (!id) {
        throw new HttpException(
          `Erreur dans la création du rucher`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        id: id,
        environment: beeyardDto.environment,
        name: beeyardDto.name,
        beekeeper: beeyardDto.beekeeper,
        address: addressDto,
      } as BeeyardDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jours du rucher
   * @param beeyardDto
   */
  async update(beeyardDto: BeeyardDto) {
    try {
      await this.beeyardRepository.update(beeyardDto);
      return beeyardDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'un rucher et de l'adresse associée
   * @param id
   */
  async delete(id: number) {
    try {
      const beeyard = await this.findOne(id);
      const [beeyardDelete] = await this.beeyardRepository.delete(id);
      await this.addressService.delete(beeyard.address.id);
      return beeyardDelete;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération d'un rucher avec son adresse par l'id
   * @param id
   */
  async findOne(id: number) {
    try {
      const [rows] = await this.beeyardRepository.findOne(id);
      if (!rows) {
        return undefined;
      }
      const row = rows[0];
      const address: AddressDto = {
        id: row.id_address,
        street: row.street,
        additional_address: row.additional_address,
        zipcode: row.zipcode,
        city: row.city,
        state: row.state,
        country: row.country,
      };
      return {
        id: id,
        environment: row.environment,
        name: row.name,
        beekeeper: { id: row.id_beekeeper },
        address: address,
      } as BeeyardDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de tout les ruchers d'un apiculteur avec les adresses par l'id de l'apiculteur
   * @param id
   */
  async findAllByIdBeekeeper(id: number) {
    try {
      const [rows] = await this.beeyardRepository.findAllByIdBeekeeper(id);
      if (!rows) {
        return undefined;
      }

      const beeyards: BeeyardDto[] = [];

      for (const beeyard of rows as any) {
        const address: AddressDto = {
          id: beeyard.id_address,
          street: beeyard.street,
          additional_address: beeyard.additional_address,
          zipcode: beeyard.zipcode,
          city: beeyard.city,
          state: beeyard.state,
          country: beeyard.country,
        };
        beeyards.push({
          id: beeyard.id,
          environment: beeyard.environment,
          name: beeyard.name,
          beekeeper: { id: beeyard.id_beekeeper },
          address: address,
        } as BeeyardDto);
      }
      return beeyards;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
