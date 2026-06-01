import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws = require('ws');
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    const rawConnectionString = process.env.DATABASE_URL;
    if (!rawConnectionString) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    // Strip any outer double quotes and trailing carriage returns (\r) in Windows environments
    const connectionString = rawConnectionString.replace(/^"|"$/g, '').trim();
    process.env.DATABASE_URL = connectionString; // Overwrite globally to clean it for all database libraries
    const adapter = new PrismaNeon({ connectionString });
    super({ adapter });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
