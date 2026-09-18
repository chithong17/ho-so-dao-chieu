CREATE TABLE `competition_actions` (
	`id` text PRIMARY KEY NOT NULL,
	`member_id` text NOT NULL,
	`expected_version` integer NOT NULL,
	`processed` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`member_id`) REFERENCES `competition_members`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_competition_actions_member` ON `competition_actions` (`member_id`);--> statement-breakpoint
CREATE TABLE `competition_members` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`role` text NOT NULL,
	`name` text NOT NULL,
	`normalized_name` text NOT NULL,
	`session_hash` text NOT NULL,
	`join_order` integer NOT NULL,
	`joined_at` integer NOT NULL,
	`last_seen_at` integer NOT NULL,
	`ready` integer DEFAULT false NOT NULL,
	`initial_conclusion` text,
	`initial_confidence` text,
	`game_state` text,
	`version` integer DEFAULT 0 NOT NULL,
	`score` integer DEFAULT 0 NOT NULL,
	`score_updated_at` integer,
	`completed_at` integer,
	`ending` integer,
	FOREIGN KEY (`room_id`) REFERENCES `competition_rooms`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_competition_members_session` ON `competition_members` (`session_hash`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_competition_members_room_name` ON `competition_members` (`room_id`,`normalized_name`);--> statement-breakpoint
CREATE INDEX `idx_competition_members_room_role` ON `competition_members` (`room_id`,`role`);--> statement-breakpoint
CREATE TABLE `competition_rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`status` text DEFAULT 'lobby' NOT NULL,
	`difficulty` text NOT NULL,
	`duration_seconds` integer NOT NULL,
	`max_players` integer NOT NULL,
	`case_version` text NOT NULL,
	`scoring_version` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`starts_at` integer,
	`play_starts_at` integer,
	`ends_at` integer,
	`end_reason` text,
	`revision` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_competition_rooms_code` ON `competition_rooms` (`code`);--> statement-breakpoint
CREATE INDEX `idx_competition_rooms_status_expiry` ON `competition_rooms` (`status`,`expires_at`);--> statement-breakpoint
CREATE TABLE `competition_score_events` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`member_id` text NOT NULL,
	`action_id` text NOT NULL,
	`event_key` text NOT NULL,
	`kind` text NOT NULL,
	`reference` text NOT NULL,
	`delta` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `competition_rooms`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`member_id`) REFERENCES `competition_members`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`action_id`) REFERENCES `competition_actions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_competition_score_member_event` ON `competition_score_events` (`member_id`,`event_key`);--> statement-breakpoint
CREATE INDEX `idx_competition_score_room_member` ON `competition_score_events` (`room_id`,`member_id`);