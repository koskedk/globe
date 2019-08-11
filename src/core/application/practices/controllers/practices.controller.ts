import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgencyDto } from '../../../domain/practices/dtos/agency.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveAgencyCommand } from '../commands/save-agency.command';
import { GetLocationsQuery } from '../../locations/queries/get-locations.query';
import { GetAgenciesQuery } from '../queries/get-agencies.query';

@Controller('practices')
export class PracticesController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get()
  async getAgencies(): Promise<any> {
    return this.queryBus.execute(
      new GetAgenciesQuery(),
    );
  }

  @Post()
  async createOrUpdateAgency(@Body() agency: AgencyDto) {
    return this.commandBus.execute(
      new SaveAgencyCommand(agency.name, agency.display, agency.id),
    );
  }
}
