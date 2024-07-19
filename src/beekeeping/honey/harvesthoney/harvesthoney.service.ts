import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HarvesthoneyRepository } from './harvesthoney.repository';
import { HoneycropService } from '../honeycrop/honeycrop.service';

@Injectable()
export class HarvesthoneyService {
  constructor(
    private readonly harvesthoneyRepository: HarvesthoneyRepository,
    private readonly honeycropService: HoneycropService,
  ) {}

  async deleteHoneycrop(id: number) {
    try {
      const result = await this.honeycropService.delete(id);
      return result;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
