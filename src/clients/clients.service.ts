import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Client } from './clients.interface';

@Injectable()
export class ClientsService {
  constructor(@InjectModel('Client') private ClientModel: Model<Client>) {}

  async create(client: Client) {
    const createClient = new this.ClientModel(client);
    return await createClient.save();
  }

  async getAll(): Promise<Client[]> {
    return await this.ClientModel.find().exec();
  }

  async getById(id: string) {
    return await this.ClientModel.findById(id).exec();
  }

  async udpate(id: string, client: Client) {
    return await this.ClientModel.findByIdAndUpdate(id, client, { new: true });
  }

  async delete(id: string) {
    await this.ClientModel.findByIdAndDelete(id);
  }
}
