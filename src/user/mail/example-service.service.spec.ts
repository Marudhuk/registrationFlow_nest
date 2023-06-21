import { Test, TestingModule } from '@nestjs/testing';
import { ExampleServiceService } from './example-service.service';

describe('ExampleServiceService', () => {
  let service: ExampleServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleServiceService],
    }).compile();

    service = module.get<ExampleServiceService>(ExampleServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
