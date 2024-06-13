import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { sql } from "drizzle-orm";
import * as tables from "@/lib/schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const sqlClient = postgres({
  /* your postgres connection options */
});
const drizzleDb = drizzle(sqlClient);

async function getUserFromDb(email: any, password: any) {
  // Fetch the user from the database
  const users = await db.select().from(tables.users).where(sql`${tables.users.email} = ${email}`).execute()

  if (users.length === 0) {
    return null;
  }

  const user = users[0];


  // Verify the password
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  // Return the user object
  return user;
}

export default getUserFromDb;
