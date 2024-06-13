-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "admins" (
	"id_admin" serial PRIMARY KEY NOT NULL,
	"id_user" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobtitles" (
	"id_jobtitle" serial PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id_user" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(73) NOT NULL,
	"datecreated" timestamp DEFAULT now(),
	"creatoradminid" integer,
	"email" varchar(320),
	"emailverified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"id_team" serial PRIMARY KEY NOT NULL,
	"team_name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userteamposition" (
	"id_ustepo" serial PRIMARY KEY NOT NULL,
	"id_user" integer,
	"id_team" integer,
	"id_jobtitle" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback" (
	"id_feedback" serial PRIMARY KEY NOT NULL,
	"Performance" integer,
	"well_being" integer,
	"flow" integer,
	"communication" integer,
	"activity" integer,
	"collaboration" integer,
	"efficiency" integer,
	"satisfaction" integer,
	"thread_id" varchar(64),
	"id_user" integer,
	"id_team" integer,
	"feedback_time" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id_message" serial PRIMARY KEY NOT NULL,
	"message" varchar(9999),
	"messagedate" timestamp with time zone DEFAULT now(),
	"id_user" integer,
	"id_team" integer,
	"email" varchar(320),
	"thread_id" varchar(64)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_messages" (
	"id_usermessage" serial PRIMARY KEY NOT NULL,
	"message" varchar(9999),
	"messagedate" timestamp with time zone DEFAULT now(),
	"id_user" integer,
	"id_team" integer,
	"email" varchar(320),
	"thread_id" varchar(64)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userid" integer,
	"expires" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"compoundkey" integer PRIMARY KEY NOT NULL,
	"userid" integer,
	"type" text,
	"provider" text,
	"provideraccountid" text,
	"refresh_token" text,
	"access_tokken" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_tokken" text,
	"session_state" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userteamposition" ADD CONSTRAINT "userteamposition_id_jobtitle_jobtitles_id_jobtitle_fk" FOREIGN KEY ("id_jobtitle") REFERENCES "public"."jobtitles"("id_jobtitle") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "fk_id_puserid" FOREIGN KEY ("userid") REFERENCES "public"."users"("id_user") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "fk_id_auserid" FOREIGN KEY ("userid") REFERENCES "public"."users"("id_user") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/