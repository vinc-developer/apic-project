import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HoneycropDto } from './dto/honeycrop.dto';
import { HoneycropRepository } from './honeycrop.repository';

@Injectable()
export class HoneycropService {
  constructor(private readonly honeycropRepository: HoneycropRepository) {}

  /**
   * Création d'une récolte d'une ruche
   * @param honeycropDto
   */
  async create(honeycropDto: HoneycropDto): Promise<HoneycropDto> {
    try {
      const [result] = await this.honeycropRepository.create(honeycropDto);
      const id = (result as any).insertId;
      if (!id) {
        throw new HttpException(
          `Erreur dans la création de la récolte`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        id: id,
        name: honeycropDto.name,
        honey_kg: honeycropDto.honey_kg,
        nb_hausses: honeycropDto.nb_hausses,
        beehive: honeycropDto.beehive,
      } as HoneycropDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jour d'une récolte
   * @param honeycropDto
   */
  async update(honeycropDto: HoneycropDto): Promise<HoneycropDto> {
    try {
      await this.honeycropRepository.update(honeycropDto);
      return honeycropDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'une récolte
   * @param id
   */
  async delete(id: number) {
    try {
      const result = await this.honeycropRepository.delete(id);
      return result;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération d'une récolte
   * @param id
   */
  async findOne(id: number): Promise<HoneycropDto> {
    try {
      const [rows] = await this.honeycropRepository.findOne(id);
      if (!rows) {
        return undefined;
      }
      const row = rows[0];

      return {
        id: row.id,
        name: row.name,
        honey_kg: row.honey_kg,
        nb_hausses: row.nb_hausses,
        beehive: {
          id: row.id_beehive,
        },
      } as HoneycropDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
