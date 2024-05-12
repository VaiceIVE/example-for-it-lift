import { Test, TestingModule } from '@nestjs/testing';
import { PathsController } from './paths.controller';
import { PathsService } from './paths.service';

describe('PathsController', () => {
  let controller: PathsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PathsController],
      providers: [PathsService],
    }).compile();

    controller = module.get<PathsController>(PathsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
