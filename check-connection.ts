import { AppDataSource } from './src/data-source';

console.log('Initializing Data Source...');

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    return AppDataSource.runMigrations(); // 마이그레이션 실행
  })
  .then(() => {
    console.log('Migrations have been run successfully!');
    return AppDataSource.destroy();
  })
  .then(() => {
    console.log('Data Source has been destroyed!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
