// // backend/prisma.config.ts
// import { defineConfig } from '@prisma/config';
// import process from 'node:process';

// export default defineConfig({
//   datasource: {
//     url: process.env.DATABASE_URL,
//   },
// });

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: "postgresql://user_todo:password_todo@localhost:5432/todo_db?schema=public",
  },
});