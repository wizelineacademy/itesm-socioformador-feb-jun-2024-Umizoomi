import { pgTable, serial, integer, varchar, timestamp, text, foreignKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const admins = pgTable("admins", {
	idAdmin: serial("id_admin").primaryKey().notNull(),
	idUser: integer("id_user"),
});

export const jobtitles = pgTable("jobtitles", {
	idJobtitle: serial("id_jobtitle").primaryKey().notNull(),
	title: varchar("title", { length: 50 }).notNull(),
});

export const users = pgTable("users", {
	idUser: serial("id_user").primaryKey().notNull(),
	username: varchar("username", { length: 50 }).notNull(),
	password: varchar("password", { length: 73 }).notNull(),
	datecreated: timestamp("datecreated", { mode: 'string' }).defaultNow(),
	creatoradminid: integer("creatoradminid"),
	email: varchar("email", { length: 320 }),
	emailverified: timestamp("emailverified", { mode: 'string' }),
	image: text("image"),
});

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

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
	  .notNull()
	  .references(() => users.idUser, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
  })

export const account = pgTable("account", {
	compoundkey: integer("compoundkey").primaryKey().notNull(),
	userid: integer("userid").references(() => users.idUser, { onDelete: "cascade" } ),
	type: text("type"),
	provider: text("provider"),
	provideraccountid: text("provideraccountid"),
	refreshToken: text("refresh_token"),
	accessTokken: text("access_tokken"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idTokken: text("id_tokken"),
	sessionState: text("session_state"),
});