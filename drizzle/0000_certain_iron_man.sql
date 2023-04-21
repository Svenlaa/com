CREATE TABLE `Account` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`type` varchar(255),
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255)
);

CREATE TABLE `Example` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT '2023-04-21 12:56:16.636',
	`updatedAt` datetime(3) NOT NULL
);

CREATE TABLE `Run` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`distance` mediumint NOT NULL,
	`time` mediumint,
	`date` varchar(10) NOT NULL,
	`yearWeek` varchar(7) NOT NULL,
	`isEvent` boolean NOT NULL DEFAULT false,
	`location` varchar(255)
);

CREATE TABLE `Session` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` datetime(3) NOT NULL
);

CREATE TABLE `User` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`emailVerified` datetime(3),
	`image` varchar(255),
	`isAdmin` boolean NOT NULL DEFAULT false
);

CREATE TABLE `VerificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` datetime(3) NOT NULL
);

ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;
CREATE UNIQUE INDEX ` Account_provider_providerAccountId_key` ON `Account` (`provider`,`providerAccountId`);
CREATE UNIQUE INDEX `Session_sessionToken_key` ON `Session` (`sessionToken`);
CREATE UNIQUE INDEX `User_email_key` ON `User` (`email`);
CREATE UNIQUE INDEX `VerificationToken_identifier_token_key` ON `VerificationToken` (`identifier`,`token`);
CREATE UNIQUE INDEX `VerificationToken_token_key` ON `VerificationToken` (`token`);