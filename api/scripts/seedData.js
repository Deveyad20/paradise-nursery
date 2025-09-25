require('dotenv').config();
const { sequelize, seedDatabase } = require('../data/sampleData');

const seed = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync database (create tables if they don't exist)
    await sequelize.sync({ force: true });
    console.log('✅ Database synchronized');

    // Seed data
    await seedDatabase();

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

seed();