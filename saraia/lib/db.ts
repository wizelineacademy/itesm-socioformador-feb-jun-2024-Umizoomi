import config from "@/lib/config";
import {drizzle} from "drizzle-orm/node-postgres"
import { Pool } from "pg";
let sslmode = "";
if(config.APP_ENV === "prod"){
    sslmode = "?sslmode=require";
}

export const pool = new Pool({
    connectionString: config.POSTGRES_URL + sslmode
});

export const db = drizzle(pool, {logger:true});

export async function getTeamMembers() {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT t2.id_user, t1.username from users t1 INNER JOIN userteamposition t2 ON t1.id_user = t2.id_user WHERE id_team = 1;');
      return res.rows.map((row: { name: string }) => row.name);
    } finally {
      client.release();
    }
  }
