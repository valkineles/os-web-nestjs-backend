import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';

import { IUsers } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: PaginateModel<IUsers>) {}

  async create(user: IUsers) {
    try {
      const createUser = new this.userModel(user);
      return await createUser.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(
    filters: Array<string>,
    page: number,
    limit: number,
  ): Promise<PaginateResult<IUsers>> {
    return await this.userModel.paginate(filters, { page, limit });
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, user: IUsers) {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
