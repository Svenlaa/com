CREATE TABLE `runs` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`distance` mediumint NOT NULL,
	`time` mediumint,
	`date` date NOT NULL,
	`yearWeek` varchar(7) NOT NULL,
	`isEvent` boolean NOT NULL DEFAULT false,
	`location` varchar(255)
);
