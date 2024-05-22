import { pgTable, type AnyPgColumn, foreignKey, serial, integer, varchar, timestamp, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const admins = pgTable("admins", {
	idAdmin: serial("id_admin").primaryKey().notNull(),
	idUser: integer("id_user").references((): AnyPgColumn => users.idUser),
});

export const jobtitles = pgTable("jobtitles", {
	idJobtitle: serial("id_jobtitle").primaryKey().notNull(),
	title: varchar("title", { length: 50 }).notNull(),
});

export const userteamposition = pgTable("userteamposition", {
	idUstepo: serial("id_ustepo").primaryKey().notNull(),
	idTeam: integer("id_team").references(() => team.idTeam),
	idJobtitle: integer("id_jobtitle").references(() => jobtitles.idJobtitle),
});

export const team = pgTable("team", {
	idTeam: serial("id_team").primaryKey().notNull(),
	teamName: varchar("team_name", { length: 50 }).notNull(),
});

export const messages = pgTable("messages", {
	idMessage: serial("id_message").primaryKey().notNull(),
	message: varchar("message", { length: 9999 }),
	messagedate: timestamp("messagedate", { withTimezone: true, mode: 'string' }).defaultNow(),
	idUser: integer("id_user").references(() => users.idUser),
	idTeam: integer("id_team").references(() => team.idTeam),
});

export const feedback = pgTable("feedback", {
	idFeedback: serial("id_feedback").primaryKey().notNull(),
	idUser: integer("id_user").references(() => users.idUser),
	idTeam: integer("id_team").references(() => team.idTeam),
	purpose: integer("purpose"),
	productivity: integer("productivity"),
	autonomy: integer("autonomy"),
	support: integer("support"),
	mastery: integer("mastery"),
	creativity: integer("creativity"),
	challenge: integer("challenge"),
	performance: integer("performance"),
	feedbackdate: date("feedbackdate").default(sql`CURRENT_TIMESTAMP`),
});

export const users = pgTable("users", {
	idUser: serial("id_user").primaryKey().notNull(),
	username: varchar("username", { length: 50 }).notNull(),
	password: varchar("password", { length: 73 }).notNull(),
	datecreated: timestamp("datecreated", { mode: 'string' }).defaultNow(),
	creatoradminid: integer("creatoradminid").references((): AnyPgColumn => admins.idAdmin),
	email: varchar("email", { length: 320 }),
});