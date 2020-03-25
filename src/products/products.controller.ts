import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Request } from '@nestjs/common';
import { PaginateResult } from 'mongoose';

import { IProducts } from './products.interface';
import { ProductsService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async create(@Body() product: IProducts): Promise<IProducts> {
    if (product.descricao.length < 10) {
      throw new HttpException(
        'A descrição deve ter mais de 10 caracteres !',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.productService.create(product);
  }

  @Get()
  async getAll(
    @Request() req,
    @Query() query,
  ): Promise<PaginateResult<IProducts>> {
    const { page = 1, limit = 5 } = query;
    return this.productService.getAll(req.filters, page, limit);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IProducts> {
    return this.productService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: IProducts,
  ): Promise<IProducts> {
    return this.productService.update(id, product);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
