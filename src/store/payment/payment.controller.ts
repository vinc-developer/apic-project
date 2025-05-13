import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { Response } from "express";

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  
  @Post()
  async create(@Body() paymentDto: PaymentDto, @Res() res: Response){
    try {
      const result = await this.paymentService.createPayment(paymentDto);
      res.status(HttpStatus.OK).json(result);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur durant le payment : ${err.message}`,
      });
    }
  }
}
