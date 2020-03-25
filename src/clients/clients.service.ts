import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';

import { IClient } from './clients.interface';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel('Client') private ClientModel: PaginateModel<IClient>,
  ) {}

  async create(client: IClient) {
    try {
      const createClient = new this.ClientModel(client);
      return await createClient.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(
    filters: Array<string>,
    page: number,
    limit: number,
  ): Promise<PaginateResult<IClient>> {
    return await this.ClientModel.paginate(filters, { page, limit });
  }

  async getById(id: string) {
    return await this.ClientModel.findById(id).exec();
  }

  async udpate(id: string, client: IClient) {
    return await this.ClientModel.findByIdAndUpdate(id, client, { new: true });
  }

  async delete(id: string) {
    await this.ClientModel.findByIdAndDelete(id);
  }
}
