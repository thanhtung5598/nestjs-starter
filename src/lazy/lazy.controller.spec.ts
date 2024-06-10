import { Test, TestingModule } from '@nestjs/testing';
import { LazyController } from './lazy.controller';
import { LazyService } from './lazy.service';

describe('LazyController', () => {
  let controller: LazyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LazyController],
      providers: [LazyService],
    }).compile();

    controller = module.get<LazyController>(LazyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
