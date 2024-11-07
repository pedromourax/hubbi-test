import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Pass PrismaClient options here
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    // Connect to the database when the module initializes
    await this.$connect();
  }

  async onModuleDestroy() {
    // Disconnect from the database when the application is shutting down
    await this.$disconnect();
  }

  // Helper method to clean the database during testing
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'test') {
      // Delete all data in reverse order of dependencies
      const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');

      return await Promise.all(
        models.map((modelKey) => {
          if (this[modelKey]) {
            return this[modelKey].deleteMany();
          }
        }),
      );
    }
  }

  // Helper method to enable transactions
  async executeInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return this.$transaction(async (prisma) => {
      return await fn();
    });
  }
}
