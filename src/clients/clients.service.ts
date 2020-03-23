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
    if (client.nome.length < 10)
      throw new HttpException(
        'o nome deve ter mais de 10 caracteres !',
        HttpStatus.BAD_REQUEST,
      );
    try {
      const createClient = new this.ClientModel(client);
      return await createClient.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
