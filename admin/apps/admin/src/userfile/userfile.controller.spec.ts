import { Test, TestingModule } from '@nestjs/testing';
import { UserfileController } from './userfile.controller';

describe('UserfileController', () => {
  let controller: UserfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserfileController],
    }).compile();

    controller = module.get<UserfileController>(UserfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
