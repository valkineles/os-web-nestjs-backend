import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Client } from './clients.interface';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Post()
  async create(@Body() client: Client): Promise<Client> {
    if (client.nome.length < 10) {
      throw new BadRequestException('o nome deve ter mais de 10 caracteres !');
    }

    return this.clientService.create(client);
  }

  @Get()
  async getAll(): Promise<Client[]> {
    return this.clientService.getAll();
  }

  @Get(':id')
  async getBYId(@Param('id') id: string): Promise<Client> {
    return this.clientService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() client: Client,
  ): Promise<Client> {
    return this.clientService.udpate(id, client);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.clientService.delete(id);
  }
}
