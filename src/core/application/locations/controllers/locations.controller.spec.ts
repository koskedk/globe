import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { QueryBus } from '@nestjs/cqrs';
import { County } from '../../../domain/locations/county';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsModule } from '../locations.module';
import { getTestCounties } from '../../../../../test/test.data';
import { GetLocationsHandler } from '../queries/handlers/get-locations.handler';
import { GetLocationsQuery } from '../queries/get-locations.query';
import { CountyDto } from '../../../domain/locations/dtos/county.dto';
import { Logger } from '@nestjs/common';
import { PracticesController } from '../../practices/controllers/practices.controller';

describe('Locations Controller Tests', () => {
  let module: TestingModule;
  let controller: LocationsController;
  let testCounties: County[] = [];
  const dbHelper = new TestDbHelper();
  let liveCounty: County;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        LocationsModule,
      ],
    }).compile();
    testCounties = getTestCounties();
    await dbHelper.initConnection();
    await dbHelper.seedDb('counties', testCounties);

    const getLocationsHandler = module.get<GetLocationsHandler>(GetLocationsHandler);
    const queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(getLocationsHandler, GetLocationsQuery.name);

    controller = new LocationsController(queryBus);
  });
  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveCounty = new County(99, 'CountyX');
    await dbHelper.seedDb('counties', [liveCounty]);
    controller = module.get<LocationsController>(LocationsController);
  });

  it('should get All Counties', async () => {
    const result = await controller.getCounties();
    expect(result.length).toBeGreaterThan(0);
    result.forEach(c => Logger.debug(`${c}`));
  });

});
