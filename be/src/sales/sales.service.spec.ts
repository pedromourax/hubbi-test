import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { PrismaService } from 'src/prisma.service';

describe('SalesService', () => {
  let service: SalesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        {
          provide: PrismaService,
          useValue: {
            sale: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new sale', async () => {
      const createSaleDto = {
        items: [
          { productId: 1, quantity: 2, price: 100 },
          { productId: 2, quantity: 1, price: 50 },
        ],
      };

      const expectedSale = {
        id: 1,
        totalAmount: 250,
        status: 'PENDING',
        items: [
          {
            id: 1,
            quantity: 2,
            price: 100,
            productId: 1,
            saleId: 1,
          },
          {
            id: 2,
            quantity: 1,
            price: 50,
            productId: 2,
            saleId: 1,
          },
        ],
      };

      jest.spyOn(prisma.sale, 'create').mockResolvedValue(expectedSale as any);

      const result = await service.create(createSaleDto);
      expect(result).toEqual(expectedSale);
    });
  });
});
