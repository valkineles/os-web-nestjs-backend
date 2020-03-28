import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';

import { IServices } from './services.interface';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('Service') private serviceModel: PaginateModel<IServices>,
  ) {}

  async create(service: IServices) {
    try {
      const createService = new this.serviceModel(service);
      return await createService.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(
    filters: Array<string>,
    page: number,
    limit: number,
  ): Promise<PaginateResult<IServices>> {
    return await this.serviceModel.paginate(filters, { page, limit });
  }

  async getById(id: string) {
    return await this.serviceModel.findById(id).exec();
  }

  async update(id: string, product: IServices) {
    return await this.serviceModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.serviceModel.findByIdAndDelete(id);
  }
}
