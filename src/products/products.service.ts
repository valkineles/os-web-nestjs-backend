import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';

import { IProducts } from './products.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: PaginateModel<IProducts>,
  ) {}

  async create(product: IProducts) {
    try {
      const createProduct = new this.productModel(product);
      return await createProduct.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(
    filters: Array<string>,
    page: number,
    limit: number,
  ): Promise<PaginateResult<IProducts>> {
    return await this.productModel.paginate(filters, { page, limit });
  }

  async getById(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, product: IProducts) {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
