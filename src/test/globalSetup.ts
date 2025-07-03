import { execSync } from 'node:child_process';

export default async () => {
  console.log('Executing the globalSetup');
  console.log(__dirname);
  const command = `DATABASE_URL="file:./test.db" npx prisma migrate deploy`;
  // Run the migration command
  try {
    execSync(command, {
      stdio: 'inherit',
    });
    console.log('✅ Prisma migrations applied successfully.');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error('❌ Failed to apply migrations for the test database.');
    // Exit with a non-zero code to fail the test run if migrations fail
    process.exit(1);
  }
};
