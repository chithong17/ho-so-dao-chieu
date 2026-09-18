import {index,integer,sqliteTable,text,uniqueIndex} from 'drizzle-orm/sqlite-core';

export const competitionRooms=sqliteTable('competition_rooms',{
 id:text('id').primaryKey(),code:text('code').notNull(),status:text('status').notNull().default('lobby'),difficulty:text('difficulty').notNull(),durationSeconds:integer('duration_seconds').notNull(),maxPlayers:integer('max_players').notNull(),caseVersion:text('case_version').notNull(),scoringVersion:integer('scoring_version').notNull().default(1),createdAt:integer('created_at').notNull(),expiresAt:integer('expires_at').notNull(),startsAt:integer('starts_at'),playStartsAt:integer('play_starts_at'),endsAt:integer('ends_at'),endReason:text('end_reason'),revision:integer('revision').notNull().default(0)
},t=>[uniqueIndex('idx_competition_rooms_code').on(t.code),index('idx_competition_rooms_status_expiry').on(t.status,t.expiresAt)]);

export const competitionMembers=sqliteTable('competition_members',{
 id:text('id').primaryKey(),roomId:text('room_id').notNull().references(()=>competitionRooms.id,{onDelete:'cascade'}),role:text('role').notNull(),name:text('name').notNull(),normalizedName:text('normalized_name').notNull(),sessionHash:text('session_hash').notNull(),joinOrder:integer('join_order').notNull(),joinedAt:integer('joined_at').notNull(),lastSeenAt:integer('last_seen_at').notNull(),ready:integer('ready',{mode:'boolean'}).notNull().default(false),initialConclusion:text('initial_conclusion'),initialConfidence:text('initial_confidence'),gameState:text('game_state'),version:integer('version').notNull().default(0),score:integer('score').notNull().default(0),scoreUpdatedAt:integer('score_updated_at'),completedAt:integer('completed_at'),ending:integer('ending')
},t=>[uniqueIndex('idx_competition_members_session').on(t.sessionHash),uniqueIndex('idx_competition_members_room_name').on(t.roomId,t.normalizedName),index('idx_competition_members_room_role').on(t.roomId,t.role)]);

export const competitionActions=sqliteTable('competition_actions',{
 id:text('id').primaryKey(),memberId:text('member_id').notNull().references(()=>competitionMembers.id,{onDelete:'cascade'}),expectedVersion:integer('expected_version').notNull(),processed:integer('processed',{mode:'boolean'}).notNull().default(false),createdAt:integer('created_at').notNull()
},t=>[index('idx_competition_actions_member').on(t.memberId)]);

export const competitionScoreEvents=sqliteTable('competition_score_events',{
 id:text('id').primaryKey(),roomId:text('room_id').notNull().references(()=>competitionRooms.id,{onDelete:'cascade'}),memberId:text('member_id').notNull().references(()=>competitionMembers.id,{onDelete:'cascade'}),actionId:text('action_id').notNull().references(()=>competitionActions.id,{onDelete:'cascade'}),eventKey:text('event_key').notNull(),kind:text('kind').notNull(),reference:text('reference').notNull(),delta:integer('delta').notNull(),createdAt:integer('created_at').notNull()
},t=>[uniqueIndex('idx_competition_score_member_event').on(t.memberId,t.eventKey),index('idx_competition_score_room_member').on(t.roomId,t.memberId)]);
