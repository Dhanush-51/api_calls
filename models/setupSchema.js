// const pool = require('./db');

// async function setupSchema() {
//   const query = `
//     -- Profile table
//     CREATE TABLE IF NOT EXISTS "Profile" (
//       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//       username VARCHAR(255) UNIQUE NOT NULL,
//       fullName VARCHAR(255),
//       age INT,
//       profession VARCHAR(255),
//       email VARCHAR(255) UNIQUE NOT NULL,
//       passwordHash VARCHAR(255) NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );

//     -- Tweet table
//     CREATE TABLE IF NOT EXISTS "Tweet" (
//       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//       text TEXT NOT NULL,
//       userId UUID REFERENCES "Profile"(id) ON DELETE CASCADE,
//       hashtags TEXT[] DEFAULT ARRAY[]::TEXT[],
//       imagePath VARCHAR(255),
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );

//     -- Reply table
//     CREATE TABLE IF NOT EXISTS "Reply" (
//       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//       text TEXT NOT NULL,
//       userId UUID REFERENCES "Profile"(id) ON DELETE CASCADE,
//       tweetId UUID REFERENCES "Tweet"(id) ON DELETE CASCADE,
//       replyId UUID REFERENCES "Reply"(id) ON DELETE CASCADE,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );

//     -- Like table
//     CREATE TABLE IF NOT EXISTS "Like" (
//       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//       userId UUID REFERENCES "Profile"(id) ON DELETE CASCADE,
//       tweetId UUID REFERENCES "Tweet"(id) ON DELETE CASCADE,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       UNIQUE (userId, tweetId)
//     );

//     -- Bookmark table
//     CREATE TABLE IF NOT EXISTS "Bookmark" (
//       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//       userId UUID REFERENCES "Profile"(id) ON DELETE CASCADE,
//       tweetId UUID REFERENCES "Tweet"(id) ON DELETE CASCADE,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       UNIQUE (userId, tweetId)
//     );
//   `;

//   try {
//     await pool.query(query);
//     console.log('Database schema setup complete');
//   } catch (err) {
//     console.error('Error setting up schema:', err);
//   }
// }

// setupSchema();
