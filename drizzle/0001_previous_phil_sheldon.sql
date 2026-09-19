ALTER TABLE `competition_rooms` ADD `chapter_count` integer DEFAULT 3 NOT NULL;
--> statement-breakpoint
UPDATE `competition_rooms` SET `chapter_count` = 2 WHERE `difficulty` = 'easy' AND `chapter_count` > 2;
