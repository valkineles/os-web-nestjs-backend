import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Request } from '@nestjs/common';
import { PaginateResult } from 'mongoose';

import { IServices } from './services.interface';
import { ServicesService } from './services.service';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private serviceService: ServicesService) {}

  @Post()
  async create(@Body() service: IServices): Promise<IServices> {
    if (service.descricao.length < 10) {
      throw new HttpException(
        'A descrição deve ter mais de 10 caracteres !',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.serviceService.create(service);
  }

  @Get()
  async getAll(
    @Request() req,
    @Query() query,
  ): Promise<PaginateResult<IServices>> {
    const { page = 1, limit = 5 } = query;
    return this.serviceService.getAll(req.filters, page, limit);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IServices> {
    return this.serviceService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: IServices,
  ): Promise<IServices> {
    return this.serviceService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
