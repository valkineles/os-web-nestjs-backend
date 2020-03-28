import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';

import { IMaintenances } from './maintenances.interface';

@Injectable()
export class MaintenancesService {
  constructor(
    @InjectModel('Maintenance')
    private maintenanceModel: PaginateModel<IMaintenances>,
  ) {}

  async create(maintenance: IMaintenances) {
    try {
      const createProduct = new this.maintenanceModel(maintenance);
      return await createProduct.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(
    filters: Array<string>,
    page: number,
    limit: number,
  ): Promise<PaginateResult<IMaintenances>> {
    return await this.maintenanceModel.paginate(filters, { page, limit });
  }

  async getById(id: string) {
    return await this.maintenanceModel.findById(id).exec();
  }

  async update(id: string, maintenance: IMaintenances) {
    return await this.maintenanceModel.findByIdAndUpdate(id, maintenance, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.maintenanceModel.findByIdAndDelete(id);
  }
}
