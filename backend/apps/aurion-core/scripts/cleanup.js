const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
require('dotenv/config');

neonConfig.webSocketConstructor = ws;

const rawConnectionString = process.env.DATABASE_URL;
if (!rawConnectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}
const connectionString = rawConnectionString.replace(/^"|"$/g, '').trim();
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Cleaning up test/mock records from database...');
  
  const deleteResult = await prisma.contactInquiry.deleteMany({
    where: {
      OR: [
        { name: 'Legacy User' },
        { name: 'Extended User' },
        { name: 'Patch Tester' },
        { name: 'Platform Errors' },
        { name: 'Budget Errors' },
        { name: 'No Email' }
      ]
    }
  });
  
  console.log(`Deleted ${deleteResult.count} test/mock records.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
