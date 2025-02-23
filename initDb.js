const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createTables = async () => {
  const client = await pool.connect();

  try {
    // Create Profile table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Profile" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(255) UNIQUE NOT NULL,
        fullName VARCHAR(255),
        age INT,
        profession VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Tweet table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Tweet" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        text TEXT NOT NULL,
        userId UUID REFERENCES "Profile" (id) ON DELETE CASCADE,
        hashtags TEXT[],
        imagePath VARCHAR(255),
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Reply table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Reply" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        text TEXT NOT NULL,
        userId UUID REFERENCES "Profile" (id) ON DELETE CASCADE,
        tweetId UUID REFERENCES "Tweet" (id) ON DELETE CASCADE,
        replyId UUID REFERENCES "Reply" (id) ON DELETE CASCADE,
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Like table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Like" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID REFERENCES "Profile" (id) ON DELETE CASCADE,
        tweetId UUID REFERENCES "Tweet" (id) ON DELETE CASCADE,
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (userId, tweetId)
      );
    `);

    // Create Bookmark table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Bookmark" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID REFERENCES "Profile" (id) ON DELETE CASCADE,
        tweetId UUID REFERENCES "Tweet" (id) ON DELETE CASCADE,
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (userId, tweetId)
      );
    `);

    console.log("Database tables ensured.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    client.release();
  }
};

// Export the createTables function
module.exports = createTables;
