import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testPrismaConnection() {
  try {
    console.log('Testing Prisma connection...');

    // Test database connection
    await prisma.$connect();
    console.log('✓ Successfully connected to database');

    // Count existing users
    const userCount = await prisma.user.count();
    console.log(`✓ Current users in database: ${userCount}`);

    // Create a test user
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
      },
    });
    console.log('✓ Created test user:', testUser);

    // Retrieve the user
    const foundUser = await prisma.user.findUnique({
      where: { id: testUser.id },
    });
    console.log('✓ Retrieved user:', foundUser);

    // Get all users
    const allUsers = await prisma.user.findMany();
    console.log(`✓ Total users now: ${allUsers.length}`);

    console.log('\n✅ All Prisma tests passed!');
  } catch (error) {
    console.error('❌ Prisma test failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('✓ Disconnected from database');
  }
}

testPrismaConnection().catch((e) => {
  console.error(e);
  process.exit(1);
});
