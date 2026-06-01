import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  private pool: Pool | null = null;

  constructor() {
    const rawConnectionString = process.env.DATABASE_URL;
    if (!rawConnectionString) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    // Strip any outer double quotes and trailing carriage returns (\r) in Windows environments
    const connectionString = rawConnectionString.replace(/^"|"$/g, '').trim();
    process.env.DATABASE_URL = connectionString; // Overwrite globally to clean it for all database libraries
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    super({ adapter });
    this.pool = pool;
  }

  async onModuleDestroy() {
    await this.$disconnect();
    if (this.pool) {
      await this.pool.end();
    }
  }
}
