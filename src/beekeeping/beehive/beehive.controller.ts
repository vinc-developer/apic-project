import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { BeehiveService } from './beehive.service';
import { BeehiveDto } from './dto/beehive.dto';
import { Response } from 'express';

@Controller('beehive')
export class BeehiveController {
  constructor(private readonly beehiveService: BeehiveService) {}

  /**
   *
   * @param beehiveDto
   * @param res
   */
  @Post()
  async create(@Body() beehiveDto: BeehiveDto, @Res() res: Response) {
    try {
      const beehive: BeehiveDto = await this.beehiveService.create(beehiveDto);
      res.status(HttpStatus.CREATED).json(beehive);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la création de la ruche : ${err.message}`});
    }
  }

  /**
   *
   * @param beehiveDto
   * @param res
   */
  @Put()
  async update(@Body() beehiveDto: BeehiveDto, @Res() res: Response) {
    try {
      const beehive: BeehiveDto = await this.beehiveService.update(beehiveDto);
      res.status(HttpStatus.OK).json(beehive);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la mise a jour de la ruche : ${err.message}`});
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const beehiveId: number = Number(id);
    if (isNaN(beehiveId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant de la ruche invalide'});
    }

    try {
      await this.beehiveService.delete(beehiveId);
      res.status(HttpStatus.OK).json({ message: 'Ruche supprimée avec succès' });
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la suppression de la ruche : ${err.message}`});
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const beehiveId: number = Number(id);
    if (isNaN(beehiveId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant de la ruche invalide'});
    }

    try {
      const beehive: BeehiveDto = await this.beehiveService.findOne(beehiveId);
      res.status(HttpStatus.OK).json(beehive);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur lors de la récupération de la ruche : ${err.message}`});
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Get('/beeyard/:id')
  async findAllByBeeyard(@Param('id') id: string, @Res() res: Response) {
    const beeyardId: number = Number(id);
    if (isNaN(beeyardId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant du rucher invalide'});
    }

    try {
      const beehives: BeehiveDto[] = await this.beehiveService.findAllByBeeyard(beeyardId);
      res.status(HttpStatus.OK).json(beehives);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur lors de la récupération des ruches : ${err.message}`});
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Get('/beekeeper/:id')
  async findAllByBeekeeper(@Param('id') id: string, @Res() res: Response) {
    const beekeeperId: number = Number(id);
    if (isNaN(beekeeperId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant apiculteur invalide'});
    }

    try {
      const beehives: BeehiveDto[] = await this.beehiveService.findAllByBeekeeper(beekeeperId);
      res.status(HttpStatus.OK).json(beehives);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur lors de la récupération des ruches : ${err.message}`});
    }
  }
}
