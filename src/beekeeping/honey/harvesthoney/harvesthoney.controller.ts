import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res, UsePipes, ValidationPipe
} from '@nestjs/common';
import { HarvesthoneyService } from './harvesthoney.service';
import { HarvesthoneyDto } from './dto/harvesthoney.dto';
import { Response } from 'express';
import { RelHarvestHoneycropDto } from './dto/relHarvestHoneycropDto.dto';

@Controller('harvesthoney')
export class HarvesthoneyController {
  constructor(private readonly harvesthoneyService: HarvesthoneyService) {}

  @Post()
  @UsePipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException('Données invalides');
      },
    }),
  )
  async create(@Body() harvesthoneyDto: HarvesthoneyDto, @Res() res: Response) {
    try {
      console.log('Données reçues:', harvesthoneyDto); // Debugging line
      const harvesthonay: HarvesthoneyDto = await this.harvesthoneyService.createHoneycrop(harvesthoneyDto);
      res.status(HttpStatus.OK).json(harvesthonay);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la mise a jour de la récolte : ${err.message}`});
    }
  }

  @Put()
  async update(@Body() harvesthoneyDto: HarvesthoneyDto, @Res() res: Response) {
    try {
      await this.harvesthoneyService.update(harvesthoneyDto);
      res.status(HttpStatus.OK).json(harvesthoneyDto);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la mise a jour de la récolte : ${err.message}`});
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const harvesthoneyId: number = Number(id);
    if (isNaN(harvesthoneyId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant de la recolte invalide'});
    }

    try {
      await this.harvesthoneyService.deleteHarvesthoney(harvesthoneyId);
      res.status(HttpStatus.OK).json({ message: 'Récolte supprimée avec succès' });
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la suppression de la récolte : ${err.message}`});
    }
  }

  @Delete('/honeycrop')
  async deleteHoneyCrop(@Body() relHarvestHoneycropDto: RelHarvestHoneycropDto, @Res() res: Response) {
    try {
      await this.harvesthoneyService.deleteHoneycrop(relHarvestHoneycropDto);
      res.status(HttpStatus.OK).json({ message: 'Récolte supprimée avec succès' });
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la mise a jour de la récolte : ${err.message}`});
    }
  }

  @Get('/beehive/:id')
  async findAllByBeehive(@Param('id') id: string, @Res() res: Response){
    const beehiveId: number = Number(id);
    if (isNaN(beehiveId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant de la ruche invalide'});
    }

    try {
      await this.harvesthoneyService.findAllByBeehive(beehiveId);
      res.status(HttpStatus.OK);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur lors de la récupération des données : ${err.message}`});
    }
  }

  @Get('/beeyard/:id')
  async findAllByBeeyard(@Param('id') id: string, @Res() res: Response) {
    const beeyardId: number = Number(id);
    if (isNaN(beeyardId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant du rucher invalide'});
    }

    try {
      await this.harvesthoneyService.findAllByBeeyard(beeyardId);
      res.status(HttpStatus.OK);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur lors de la récupération des données : ${err.message}`});
    }
  }

  @Get('/beekeeper/:id')
  async findAllByBeekeeper(@Param('id') id: string, @Res() res: Response) {
    const beekeeperId: number = Number(id);
    if (isNaN(beekeeperId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant de l\'apiculteur invalide'});
    }

    try {
      await this.harvesthoneyService.findAllByBeekeeper(beekeeperId);
      res.status(HttpStatus.OK);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur lors de la récupération des données : ${err.message}`});
    }
  }
}
