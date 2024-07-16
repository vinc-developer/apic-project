import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiculteurDto } from './dto/apiculteur.dto';
import { Apiculteur } from './interfaces/apiculteur.interface';
import { ApiculteurService } from './apiculteur.service';
import { Response } from 'express';

@Controller('apiculteur')
export class ApiculteurController {
  constructor(private readonly apiculteurService: ApiculteurService) {}

  /**
   * Récupération de tout les apiculteurs
   */
  @Get()
  async findAll(){
    return this.apiculteurService.findAll();
  }

  /**
   * Récupération d'un apiculteur par son id
   * @param id
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const apiculteur = this.apiculteurService.findOne(Number(id));
    if (!apiculteur) {
      throw new HttpException('Apiculteur not found', HttpStatus.NOT_FOUND);
    }
    return apiculteur;
  }

  /**
   * création d'un apiculteur
   * @param apiculteurDto
   */
  @Post()
  async create(@Body() apiculteurDto: ApiculteurDto): Promise<Apiculteur> {
    const apiculteur = this.apiculteurService.create(apiculteurDto);
    if (!apiculteur) {
      throw new HttpException('Apiculteur not created', HttpStatus.NOT_FOUND);
    }
    return apiculteur;
  }

  /**
   * Modification d'un apiculteur
   * @param id
   * @param apiculteurDto
   * @param res
   */
  @Put()
  async update(@Body() apiculteur: Apiculteur, @Res() res: Response) {
    const updateApiculteur = await this.apiculteurService.update(apiculteur);
    if (updateApiculteur) {
      res.status(HttpStatus.OK).json(updateApiculteur);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({message: 'Apiculteur Not Found'});
    }
  }

  /**
   * Suppression d'un apiculeteur
   * @param id
   * @param res
   */
  @Delete()
  delete(@Param('id') id: string, @Res() res: Response) {
    const apiculteurId = Number(id);
    if (isNaN(apiculteurId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Invalid apiculteru ID'});
    }

    const apiculteurDelete = this.apiculteurService.delete(apiculteurId);
    if (apiculteurDelete) {
      res.status(HttpStatus.OK).json(apiculteurDelete);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({message: 'Apiculteur Not Found'});
    }
  }
}
