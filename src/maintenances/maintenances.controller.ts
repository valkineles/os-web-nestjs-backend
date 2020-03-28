import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { PaginateResult } from 'mongoose';

import { IMaintenances } from './maintenances.interface';
import { MaintenancesService } from './maintenances.service';

@Controller('api/v1/maintenance')
export class MaintenancesController {
  constructor(private maintenanceService: MaintenancesService) {}

  @Post()
  async create(@Body() maintenance: IMaintenances): Promise<IMaintenances> {
    return this.maintenanceService.create(maintenance);
  }

  @Get()
  async getAll(
    @Request() req,
    @Query() query,
  ): Promise<PaginateResult<IMaintenances>> {
    const { page = 1, limit = 5 } = query;
    return this.maintenanceService.getAll(req.filters, page, limit);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IMaintenances> {
    return this.maintenanceService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() maintencance: IMaintenances,
  ): Promise<IMaintenances> {
    return this.maintenanceService.update(id, maintencance);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.maintenanceService.delete(id);
  }
}
