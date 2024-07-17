import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from 'express';
import { BeekeeperService } from './beekeeper.service';
import { BeekeeperDto } from './dto/beekeeper.dto';
import { Beekeeper } from './interfaces/beekeeper.interface';

@Controller('beekeeper')
export class BeekeeperController {
  constructor(private readonly beekeeperService: BeekeeperService) {}

  /**
   * Récupération de tout les apiculteurs
   */
  @Get()
  async findAll() {
    try {
      return await this.beekeeperService.findAll();
    } catch (err: any) {
      throw new HttpException( `Erreur dans la récupération des apiculteurs : ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération d'un apiculteur par son id
   * @param id
   * @param res
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const beekeeperId = Number(id);
    if (isNaN(beekeeperId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant apiculteur invalide'});
    }

    try {
      return await this.beekeeperService.findOne(beekeeperId);
    } catch (err: any) {
      throw new HttpException( `Erreur dans la récupération de l'apiculteur : ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * création d'un apiculteur
   * @param beekeeperDto
   */
  @Post()
  async create(@Body() beekeeperDto: BeekeeperDto) {
    try {
      return await this.beekeeperService.create(beekeeperDto);
    } catch (err: any) {
      throw new HttpException(`Erreur dans la création de l'apiculteur : ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Modification d'un apiculteur
   * @param beekeeper
   * @param res
   */
  @Put()
  async update(@Body() beekeeper: Beekeeper, @Res() res: Response) {
    try {
      return await this.beekeeperService.update(beekeeper);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la mise à jour de l'apiculteur : ${err.message}`});
    }
  }

  /**
   * Suppression d'un apiculeteur
   * @param id
   * @param res
   */
  @Delete()
  async delete(@Param('id') id: string, @Res() res: Response) {
    const beekeeperId = Number(id);
    if (isNaN(beekeeperId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant apiculteur invalide'});
    }

    try {
      return await this.beekeeperService.delete(beekeeperId);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la suppression ce l'apiculteur : ${err.message}`});
    }
  }
}
