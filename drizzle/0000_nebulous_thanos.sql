CREATE TABLE `content` (
	`id` integer,
	`slug` text PRIMARY KEY NOT NULL,
	`raw` text NOT NULL,
	`html` text NOT NULL
);
