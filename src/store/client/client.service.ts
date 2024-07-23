import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { AddressService } from '../../beekeeping/address/address.service';
import { ClientDto } from './dto/client.dto';
import { AddressDto } from '../../beekeeping/address/dto/address.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly addressService: AddressService,
  ) {}

  /**
   * Création d'un client
   * @param clientDto
   */
  async create(clientDto: ClientDto) {
    try {
      const address: AddressDto = await this.addressService.create(
        clientDto.address,
      );

      const [result] = await this.clientRepository.create(
        clientDto,
        address.id,
      );
      const id = (result as any).insertId;
      if (!id) {
        throw new HttpException(
          `Erreur dans la création du client`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        id: id,
        lastname: clientDto.lastname,
        firstname: clientDto.firstname,
        email: clientDto.email,
        phone: clientDto.phone,
        address,
      } as ClientDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jour d'un client
   * @param clientDto
   */
  async update(clientDto: ClientDto) {
    try {
      await this.clientRepository.update(clientDto);
      return clientDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'un client
   * @param id
   */
  async delete(id: number) {
    try {
      const client = await this.findOne(id);
      const [clientDelete] = await this.clientRepository.delete(id);
      await this.addressService.delete(client.id);
      return clientDelete;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération d'un client
   * @param id
   */
  async findOne(id: number) {
    try {
      const [rows] = await this.clientRepository.findOne(id);
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
        email: row.email,
        phone: row.phone,
        address: address,
      } as ClientDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
