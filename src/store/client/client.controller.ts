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
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  /**
   *
   * @param clientDto
   * @param res
   */
  @Post()
  async create(@Body() clientDto: ClientDto, @Res() res: Response) {
    try {
      const client = await this.clientService.create(clientDto);
      res.status(HttpStatus.CREATED).json(client);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la création de l'apiculteur : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param clientDto
   * @param res
   */
  @Put()
  async update(@Body() clientDto: ClientDto, @Res() res: Response) {
    try {
      const clientUpdated = await this.clientService.update(clientDto);
      res.status(HttpStatus.OK).json(clientUpdated);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la mise à jour du client : ${err.message}`,
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
    const clientId = Number(id);
    if (isNaN(clientId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant apiculteur invalide' });
    }

    try {
      await this.clientService.delete(clientId);
      res
        .status(HttpStatus.OK)
        .json({ message: 'Client supprimé avec succès.' });
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la suppression du client : ${err.message}`,
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
    const clientId = Number(id);
    if (isNaN(clientId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant client invalide' });
    }

    try {
      const client = await this.clientService.findOne(clientId);
      res.status(HttpStatus.OK).json(client);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la récupération du client : ${err.message}`,
      });
    }
  }
}
