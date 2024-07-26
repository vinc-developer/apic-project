import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BeekeeperRepository } from './beekeeper.repository';
import { BeekeeperDto } from './dto/beekeeper.dto';
import { AddressService } from '../address/address.service';
import { AddressDto } from '../address/dto/address.dto';

@Injectable()
export class BeekeeperService {
  constructor(
    private readonly beekeeperRepository: BeekeeperRepository,
    private readonly addressService: AddressService,
  ) {}

  /**
   * Création d'un apiculteur et de son adresse
   * @param beekeeperDto
   */
  async create(beekeeperDto: BeekeeperDto): Promise<BeekeeperDto> {
    try {
      const address: AddressDto = await this.addressService.create(
        beekeeperDto.address,
      );

      const [result] = await this.beekeeperRepository.create(
        beekeeperDto,
        address.id,
      );
      const id = (result as any).insertId;
      if (!id) {
        throw new HttpException(
          `Erreur dans la création de l'apiculteur`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        id: id,
        lastname: beekeeperDto.lastname,
        firstname: beekeeperDto.firstname,
        siret: beekeeperDto.siret,
        napi: beekeeperDto.napi,
        email: beekeeperDto.email,
        phone: beekeeperDto.phone,
        address,
      } as BeekeeperDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jour de l'apiculteur
   * @param beekeeperDto
   */
  async update(beekeeperDto: BeekeeperDto): Promise<BeekeeperDto> {
    try {
      await this.beekeeperRepository.update(beekeeperDto);
      return beekeeperDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'un apiculteur et de son adresse
   * @param id
   */
  async delete(id: number) {
    try {
      const beekeeper = await this.findOne(id);
      const [beekeeperDelete] = await this.beekeeperRepository.delete(id);
      await this.addressService.delete(beekeeper.address.id);
      return beekeeperDelete;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération de tout les apiculteurs
   */
  async findAll() {
    try {
      const [rows] = await this.beekeeperRepository.findAll();
      return rows;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération d'un apiculteur par son id et de sont adresse
   * @param id
   */
  async findOne(id: number): Promise<BeekeeperDto> {
    try {
      const [rows] = await this.beekeeperRepository.findOne(id);
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
        id: row.id,
        firstname: row.firstname,
        lastname: row.lastname,
        siret: row.siret,
        napi: row.napi,
        email: row.email,
        phone: row.phone,
        address: address,
      } as BeekeeperDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
