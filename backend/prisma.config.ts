import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'apps/aurion-core/prisma/schema.prisma',
  migrations: {
    path: 'apps/aurion-core/prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
