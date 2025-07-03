import { execSync } from 'node:child_process';

export default async () => {
  console.log('Executing the globalSetup');
  const command = `DATABASE_URL="file:./test.db" npx prisma migrate deploy`;
  try {
    execSync(command, {
      stdio: 'inherit',
    });
    console.log('✅ Prisma migrations applied successfully.');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error('Failed to apply migrations for the test database.');
    process.exit(1);
  }
};
