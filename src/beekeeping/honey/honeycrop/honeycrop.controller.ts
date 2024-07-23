import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { HoneycropService } from './honeycrop.service';
import { HoneycropDto } from './dto/honeycrop.dto';
import { Response } from 'express';

@Controller('honeycrop')
export class HoneycropController {
  constructor(private readonly honeycropService: HoneycropService) {}

  /**
   *
   * @param honeycropDto
   * @param res
   */
  @Put()
  async update(@Body() honeycropDto: HoneycropDto, @Res() res: Response) {
    try {
      const honeycrop = await this.honeycropService.update(honeycropDto);
      res.status(HttpStatus.OK).json(honeycrop);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la mise a jour de la récolte : ${err.message}`,
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
    const honeycropId = Number(id);
    if (isNaN(honeycropId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant récolte invalide' });
    }

    try {
      const honeycrop = await this.honeycropService.findOne(honeycropId);
      res.status(HttpStatus.OK).json(honeycrop);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la récupération de la récolte : ${err.message}`,
      });
    }
  }
}
