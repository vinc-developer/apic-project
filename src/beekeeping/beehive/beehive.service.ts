import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BeehiveRepository } from './beehive.repository';
import { BeehiveDto } from './dto/beehive.dto';

@Injectable()
export class BeehiveService {
  constructor(private readonly beehiveRepository: BeehiveRepository) {}

  /**
   * Création d'un ruche
   * @param beehiveDto
   */
  async create(beehiveDto: BeehiveDto): Promise<BeehiveDto> {
    try {
      const [result] = await this.beehiveRepository.create(beehiveDto);
      const id = (result as any).insertId;
      if (!id) {
        throw new HttpException(
          `Erreur dans la création de la ruche`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        id: id,
        bee_type: beehiveDto.bee_type,
        name: beehiveDto.name,
        type_hive: beehiveDto.type_hive,
        beeyard: beehiveDto.beeyard,
      } as BeehiveDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jour des données de la ruche
   * @param beehiveDto
   */
  async update(beehiveDto: BeehiveDto): Promise<BeehiveDto> {
    try {
      await this.beehiveRepository.update(beehiveDto);
      return beehiveDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'un ruche
   * @param id
   */
  async delete(id: number) {
    try {
      const result = await this.beehiveRepository.delete(id);
      return result;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération des informations d'une ruche
   * @param id
   */
  async findOne(id: number): Promise<BeehiveDto> {
    try {
      const [rows] = await this.beehiveRepository.findOne(id);
      if (!rows) {
        return undefined;
      }
      const row = rows[0];
      return {
        id: row.id,
        bee_type: row.bee_type,
        name: row.name,
        type_hive: row.type_hive,
        beeyard: { id: row.id_beeyard },
      } as BeehiveDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @param id
   */
  async findAllByBeeyard(id: number): Promise<BeehiveDto[]> {
    try {
      const [rows] = await this.beehiveRepository.findAllByBeeyard(id);
      if (!rows) {
        return undefined;
      }

      const beehives: BeehiveDto[] = [];

      for (const beehive of rows as any) {
        beehives.push({
          id: beehive.id,
          bee_type: beehive.bee_type,
          name: beehive.name,
          type_hive: beehive.type_hive,
          beeyard: {
            id: id,
            environment: beehive.environment,
            name: beehive.beeyard_name,
            beekeeper: { id: beehive.beeyard_name },
            address: { id: beehive.id_address },
          },
        } as BeehiveDto);
      }
      return beehives;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @param id
   */
  async findAllByBeekeeper(id: number): Promise<BeehiveDto[]> {
    try {
      const [rows] = await this.beehiveRepository.findAllByBeekeeper(id);
      if (!rows) {
        return undefined;
      }

      const beehives: BeehiveDto[] = [];

      for (const beehive of rows as any) {
        beehives.push({
          id: beehive.id,
          bee_type: beehive.bee_type,
          name: beehive.name,
          type_hive: beehive.type_hive,
          beeyard: {
            id: beehive.id_beeyard,
            environment: beehive.environment,
            name: beehive.beeyard_name,
            beekeeper: { id: id },
            address: { id: beehive.id_address },
          },
        } as BeehiveDto);
      }
      return beehives;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
