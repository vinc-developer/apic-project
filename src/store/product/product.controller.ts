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
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   *
   * @param productDto
   * @param res
   */
  @Post()
  async create(@Body() productDto: ProductDto, @Res() res: Response) {
    try {
      const product: ProductDto = await this.productService.create(productDto);
      res.status(HttpStatus.OK).json(product);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la création du produit : : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param productDto
   * @param res
   */
  @Put()
  async update(@Body() productDto: ProductDto, @Res() res: Response) {
    try {
      await this.productService.update(productDto);
      res.status(HttpStatus.OK).json(productDto);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la mise a jour du produit : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Delete()
  async delete(@Param('id') id: string, @Res() res: Response) {
    const productId: number = Number(id);
    if (isNaN(productId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant du produit invalide' });
    }

    try {
      await this.productService.delete(productId);
      res
        .status(HttpStatus.OK)
        .json({ message: 'Produit supprimée avec succès' });
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur dans la suppression du produit : ${err.message}`,
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
    const productId: number = Number(id);
    if (isNaN(productId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant du produit invalide' });
    }

    try {
      const product = await this.productService.findOne(productId);
      res.status(HttpStatus.OK).json(product);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la récupération des données : ${err.message}`,
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
      const products = await this.productService.findAll();
      res.status(HttpStatus.OK).json(products);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la récupération des données : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Get('/harvesthoney/:id')
  async findAllByHarvesthoney(@Param('id') id: string, @Res() res: Response) {
    const harvesthoneiId: number = Number(id);
    if (isNaN(harvesthoneiId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant de la récolte invalide' });
    }

    try {
      const products =
        await this.productService.findAllByHarvesthoney(harvesthoneiId);
      res.status(HttpStatus.OK).json(products);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la récupération des données : ${err.message}`,
      });
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
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Identifiant de l'apiculteur invalide" });
    }

    try {
      const products =
        await this.productService.findAllByBeekeeper(beekeeperId);
      res.status(HttpStatus.OK).json(products);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la récupération des données : ${err.message}`,
      });
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Get('tracking/:id')
  async getTracking(@Param('id') id: string, @Res() res: Response) {
    const productId: number = Number(id);
    if (isNaN(productId)) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Identifiant du produit invalide' });
    }

    try {
      const products = await this.productService.getTracking(productId);
      res.status(HttpStatus.OK).json(products);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la récupération des données : ${err.message}`,
      });
    }
  }
}
