import type { InferModel } from 'drizzle-orm';
import { pgEnum, pgTable, serial, integer, uniqueIndex, varchar, index, numeric } from 'drizzle-orm/pg-core';

// Declare the enum for profile_type
export const profileTypeEnum = pgEnum('profile_type', ['admin', 'streamer', 'viewer']);

// Profiles table
export const profiles = pgTable(
  'profiles',
  {
    id: serial('id').primaryKey().notNull(),
    nickname: varchar('nickname', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    avatar: varchar('avatar', { length: 255 }),
    type: profileTypeEnum('type').default('viewer'),
    tokensOwned: numeric('tokens_owned', { precision: 10, scale: 2 }).default('0.00'),
  },
  (profiles) => {
    return {
      nicknameIndex: uniqueIndex('nickname_idx').on(profiles.nickname),
      emailIndex: uniqueIndex('email_idx').on(profiles.email),
    };
  }
);

// Streamer_profiles table
export const streamerProfiles = pgTable('streamer_profiles', {
  profile_id: integer('profile_id')
    .primaryKey()
    .references(() => profiles.id),
  token_per_minute: numeric('token_per_minute', { precision: 10, scale: 2 }).default('0.00'),
  age: integer('age').default(18),
  orientation: varchar('orientation', { length: 255 }).default('straight'),
  hobbies: varchar('hobbies', { length: 255 }),
});

// Pictures table
export const pictures = pgTable('pictures', {
  id: serial('id').primaryKey(),
  streamer_profile_id: integer('streamer_profile_id').references(() => streamerProfiles.profile_id),
  url: varchar('url', { length: 255 }),
});

// Tokens table
export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  count: integer('count'),
  price: numeric('price', { precision: 10, scale: 2 }),
});

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  profile_id: integer('profile_id').references(() => profiles.id),
  token_id: integer('token_id').references(() => tokens.id),
});

// Indexes
export const indexes = {
  profilesNickname: uniqueIndex('profiles_nickname_idx').on(profiles.nickname),
  profilesEmail: uniqueIndex('profiles_email_idx').on(profiles.email),
  picturesStreamerProfileId: index('pictures_streamer_profile_id_idx').on(pictures.streamer_profile_id),
  ordersProfileId: index('orders_profile_id_idx').on(orders.profile_id),
  ordersTokenId: index('orders_token_id_idx').on(orders.token_id),
};

export type Profiles = InferModel<typeof profiles>;
export type InsertProfile = InferModel<typeof profiles, 'insert'>;
export type StreamerProfiles = InferModel<typeof streamerProfiles>;
export type Pictures = InferModel<typeof pictures>;
export type Tokens = InferModel<typeof tokens>;
export type Orders = InferModel<typeof orders>;
// export type Countries = InferModel<typeof countries>; // return type when queried
// export type InsertCountry = InferModel<typeof countries, 'insert'>; // insert type
