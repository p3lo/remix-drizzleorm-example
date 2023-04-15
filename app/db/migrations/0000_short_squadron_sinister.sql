DO $$ BEGIN
 CREATE TYPE "profile_type" AS ENUM('admin', 'streamer', 'viewer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"token_id" integer
);

CREATE TABLE IF NOT EXISTS "pictures" (
	"id" serial PRIMARY KEY NOT NULL,
	"streamer_profile_id" integer,
	"url" varchar(255)
);

CREATE TABLE IF NOT EXISTS "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"nickname" varchar(255),
	"email" varchar(255),
	"avatar" varchar(255),
	"type" profile_type,
	"tokens_owned" numeric(10, 2) DEFAULT '0.00'
);

CREATE TABLE IF NOT EXISTS "streamer_profiles" (
	"profile_id" integer PRIMARY KEY NOT NULL,
	"token_per_minute" numeric(10, 2) DEFAULT '0.00',
	"age" integer DEFAULT 18,
	"orientation" varchar(255) DEFAULT 'straight',
	"hobbies" varchar(255)
);

CREATE TABLE IF NOT EXISTS "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"count" integer,
	"price" numeric(10, 2)
);

DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_token_id_tokens_id_fk" FOREIGN KEY ("token_id") REFERENCES "tokens"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pictures" ADD CONSTRAINT "pictures_streamer_profile_id_streamer_profiles_profile_id_fk" FOREIGN KEY ("streamer_profile_id") REFERENCES "streamer_profiles"("profile_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "streamer_profiles" ADD CONSTRAINT "streamer_profiles_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "nickname_idx" ON "profiles" ("nickname");
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "profiles" ("email");