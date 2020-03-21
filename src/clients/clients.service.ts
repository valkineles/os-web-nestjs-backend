import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';

import { IClient } from './clients.interface';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel('Client') private ClientModel: PaginateModel<IClient>,
  ) {}

  async create(client: IClient) {
    const createClient = new this.ClientModel(client);
    return await createClient.save();
  }

  async getAll(page, limit): Promise<PaginateResult<IClient>> {
    return await this.ClientModel.paginate({}, { page, limit });
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
