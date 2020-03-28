import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { PaginateResult } from 'mongoose';

import { IUsers } from './users.interface';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usertService: UsersService) {}

  @Post()
  async create(@Body() user: IUsers): Promise<IUsers> {
    return this.usertService.create(user);
  }

  @Get()
  async getAll(
    @Request() req,
    @Query() query,
  ): Promise<PaginateResult<IUsers>> {
    const { page = 1, limit = 5 } = query;
    return this.usertService.getAll(req.filters, page, limit);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IUsers> {
    return this.usertService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: IUsers): Promise<IUsers> {
    return this.usertService.update(id, user);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usertService.delete(id);
  }
}
