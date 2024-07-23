import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BeekeeperService } from './beekeeper.service';
import { BeekeeperDto } from './dto/beekeeper.dto';

@Controller('beekeeper')
export class BeekeeperController {
  constructor(private readonly beekeeperService: BeekeeperService) {}

  /**
   *
   * @param beekeeperDto
   * @param res
   */
  @Post()
  async create(@Body() beekeeperDto: BeekeeperDto, @Res() res: Response) {
    try {
      const beekeeper = await this.beekeeperService.create(beekeeperDto);
      res.status(HttpStatus.CREATED).json(beekeeper);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la création de l'apiculteur : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param beekeeperDto
   * @param res
   */
  @Put()
  async update(@Body() beekeeperDto: BeekeeperDto, @Res() res: Response) {
    try {
      const beekeeperUpdated = await this.beekeeperService.update(beekeeperDto);
      res.status(HttpStatus.OK).json(beekeeperUpdated);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la mise à jour de l'apiculteur : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const beekeeperId = Number(id);
    if (isNaN(beekeeperId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant apiculteur invalide' });
    }

    try {
      await this.beekeeperService.delete(beekeeperId);
      res
        .status(HttpStatus.OK)
        .json({ message: 'Apiculteur supprimé avec succès.' });
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la suppression de l'apiculteur : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const beekeeperId = Number(id);
    if (isNaN(beekeeperId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant apiculteur invalide' });
    }

    try {
      const beekeeper = await this.beekeeperService.findOne(beekeeperId);
      res.status(HttpStatus.OK).json(beekeeper);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la récupération de l'apiculteur : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param res
   */
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const beekeepers = await this.beekeeperService.findAll();
      res.status(HttpStatus.OK).json(beekeepers);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la récupération des apiculteurs : ${err.message}`,
      });
    }
  }
}
