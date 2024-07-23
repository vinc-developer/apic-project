import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productService: ProductService) {}

  /**
   * Création d'un produit
   * @param productDto
   */
  async create(productDto: ProductDto) {
    try {
      const [result] = await this.productService.create(productDto);
      const id = (result as any).insertId;
      if (!id) {
        throw new HttpException(
          `Erreur dans la création du client`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        id: id,
        price: productDto.price,
        type: productDto.type,
        weight: productDto.weight,
        quantity: productDto.quantity,
        quantity_sale: productDto.quantity_sale,
        lot_number: productDto.lot_number,
        DLUO: productDto.DLUO,
        date_packaging: productDto.date_packaging,
        harvesthoney: {
          id: productDto.harvesthoney.id,
        },
      } as ProductDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jour du produit
   * @param productDto
   */
  async update(productDto: ProductDto) {
    try {
      await this.productService.update(productDto);
      return productDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'un produit
   * @param id
   */
  async delete(id: number) {
    try {
      return await this.productService.delete(id);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération d'un produit
   * @param id
   */
  async findOne(id: number) {
    try {
      const [rows] = await this.productService.findOne(id);
      if (!rows) {
        return undefined;
      }

      return {
        id: rows.id,
        price: rows.price,
        type: rows.type,
        weight: rows.weight,
        quantity: rows.quantity,
        quantity_sale: rows.quantity_sale,
        lot_number: rows.lot_number,
        DLUO: rows.DLUO,
        date_packaging: rows.date_packaging,
        harvesthoney: {
          id: rows.id_harvesthoney,
        },
      } as ProductDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {}

  async findAllByHarvesthoney(idHarvesthoney: number) {}

  async findAllByBeekeeper(idBeekeeper: number) {}

  async getTracking(id: number) {}
}
