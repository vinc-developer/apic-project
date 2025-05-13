import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  async createPayment( paymentDto: PaymentDto ) {
    try {

    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
