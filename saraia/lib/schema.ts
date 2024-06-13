import {
	boolean,
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	serial,
	varchar
  } from "drizzle-orm/pg-core"
  import postgres from "postgres"
  import { drizzle } from "drizzle-orm/postgres-js"
  import type { AdapterAccountType } from "next-auth/adapters"


export const admins = pgTable("admins", {
	idAdmin: serial("id_admin").primaryKey().notNull(),
	idUser: integer("id_user"),
});

export const jobtitles = pgTable("jobtitles", {
	idJobtitle: serial("id_jobtitle").primaryKey().notNull(),
	title: varchar("title", { length: 50 }).notNull(),
});

export const users = pgTable("user", {
	id: text("id")
	  .primaryKey()
	  .$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	password: text("password").notNull()
  })
  export const accounts = pgTable(
	"account",
	{
	  userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	  type: text("type").$type<AdapterAccountType>().notNull(),
	  provider: text("provider").notNull(),
	  providerAccountId: text("providerAccountId").notNull(),
	  refresh_token: text("refresh_token"),
	  access_token: text("access_token"),
	  expires_at: integer("expires_at"),
	  token_type: text("token_type"),
	  scope: text("scope"),
	  id_token: text("id_token"),
	  session_state: text("session_state"),
	},
	(account) => ({
	  compoundKey: primaryKey({
		columns: [account.provider, account.providerAccountId],
	  }),
	})
  )
   
  export const sessions = pgTable("session", {
	id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
	  .notNull()
	  .references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
  })
   
  export const verificationTokens = pgTable(
	"verificationToken",
	{
	  identifier: text("identifier").notNull(),
	  token: text("token").notNull(),
	  expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
	  compositePk: primaryKey({
		columns: [verificationToken.identifier, verificationToken.token],
	  }),
	})
  )
   
  export const authenticators = pgTable(
	"authenticator",
	{
	  credentialID: text("credentialID").notNull().unique(),
	  userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	  providerAccountId: text("providerAccountId").notNull(),
	  credentialPublicKey: text("credentialPublicKey").notNull(),
	  counter: integer("counter").notNull(),
	  credentialDeviceType: text("credentialDeviceType").notNull(),
	  credentialBackedUp: boolean("credentialBackedUp").notNull(),
	  transports: text("transports"),
	},
	(authenticator) => ({
	  compositePK: primaryKey({
		columns: [authenticator.userId, authenticator.credentialID],
	  }),
	})
  )


export const team = pgTable("team", {
	idTeam: serial("id_team").primaryKey().notNull(),
	teamName: varchar("team_name", { length: 50 }).notNull(),
});

export const userteamposition = pgTable("userteamposition", {
	idUstepo: serial("id_ustepo").primaryKey().notNull(),
	idUser: integer("id_user"),
	idTeam: integer("id_team"),
	idJobtitle: integer("id_jobtitle").references(() => jobtitles.idJobtitle),
});

export const feedback = pgTable("feedback", {
	idFeedback: serial("id_feedback").primaryKey().notNull(),
	performance: integer("Performance"),
	wellBeing: integer("well_being"),
	flow: integer("flow"),
	communication: integer("communication"),
	activity: integer("activity"),
	collaboration: integer("collaboration"),
	efficiency: integer("efficiency"),
	satisfaction: integer("satisfaction"),
	threadId: varchar("thread_id", { length: 64 }),
	idUser: integer("id_user"),
	idTeam: integer("id_team"),
	feedbackTime: timestamp("feedback_time", { mode: 'string' }),
});

export const messages = pgTable("messages", {
	idMessage: serial("id_message").primaryKey().notNull(),
	message: varchar("message", { length: 9999 }),
	messagedate: timestamp("messagedate", { withTimezone: true, mode: 'string' }).defaultNow(),
	idUser: integer("id_user"),
	idTeam: integer("id_team"),
	email: varchar("email", { length: 320 }),
	threadId: varchar("thread_id", { length: 64 }),
});

export const userMessages = pgTable("user_messages", {
	idUsermessage: serial("id_usermessage").primaryKey().notNull(),
	message: varchar("message", { length: 9999 }),
	messagedate: timestamp("messagedate", { withTimezone: true, mode: 'string' }).defaultNow(),
	idUser: integer("id_user"),
	idTeam: integer("id_team"),
	email: varchar("email", { length: 320 }),
	threadId: varchar("thread_id", { length: 64 }),
});
