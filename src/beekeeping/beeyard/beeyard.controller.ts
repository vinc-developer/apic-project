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
import { BeeyardService } from './beeyard.service';
import { BeeyardDto } from './dto/beeyard.dto';
import { Response } from 'express';

@Controller('beeyard')
export class BeeyardController {
  constructor(private readonly beeyardService: BeeyardService) {}

  /**
   *
   * @param beeyardDto
   * @param res
   */
  @Post()
  async create(@Body() beeyardDto: BeeyardDto, @Res() res: Response) {
    try {
      const beeyard: BeeyardDto = await this.beeyardService.create(beeyardDto);
      res.status(HttpStatus.CREATED).json(beeyard);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la création du rucher : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param beeyardDto
   * @param res
   */
  @Put()
  async update(@Body() beeyardDto: BeeyardDto, @Res() res: Response) {
    try {
      const beeyard: BeeyardDto = await this.beeyardService.update(beeyardDto);
      res.status(HttpStatus.OK).json(beeyard);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la mise a jour du rucher : ${err.message}`,
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
    const beeyardId: number = Number(id);
    if (isNaN(beeyardId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant rucher invalide' });
    }
    try {
      await this.beeyardService.delete(beeyardId);
      res
        .status(HttpStatus.OK)
        .json({ message: 'Ruché supprimé avec succès.' });
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la suppression du rucher : ${err.message}`,
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
    const beeyardId: number = Number(id);
    if (isNaN(beeyardId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant rucher invalide' });
    }

    try {
      const beeyard: BeeyardDto = await this.beeyardService.findOne(beeyardId);
      res.status(HttpStatus.OK).json(beeyard);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la récupération du rucher : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Get('/all/:id')
  async findAllByIdBeekeeper(@Param('id') id: string, @Res() res: Response) {
    const beekeeperId: number = Number(id);
    if (isNaN(beekeeperId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant apiculteur invalide' });
    }

    try {
      const beeyards: BeeyardDto[] =
        await this.beeyardService.findAllByIdBeekeeper(beekeeperId);
      res.status(HttpStatus.OK).json(beeyards);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la récupération des ruchers : ${err.message}`,
      });
    }
  }
}
