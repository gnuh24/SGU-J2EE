DROP DATABASE IF EXISTS `SGU_J2EE`;
CREATE DATABASE IF NOT EXISTS `SGU_J2EE`;
USE `SGU_J2EE`;

DROP TABLE IF EXISTS `Profile`;
CREATE TABLE IF NOT EXISTS `Profile`(
    `id`            		VARCHAR(10)                     PRIMARY KEY,
    `Email`         		NVARCHAR(255)                   UNIQUE,
    `Fullname`      		NVARCHAR(255),
    `Phone`         		NVARCHAR(20)                    UNIQUE	NOT NULL
);


INSERT INTO `Profile` (`id`, `Email`, `Fullname`, `Phone`) 
VALUES 
    ("P001", "admin@gmail.com",             "David Johnson",       "0123456789"),
    ("P002", "user1@gmail.com",   "Sophia Martinez",     "0987654321"),
    ("P003", "user2@gmail.com",  "Robert Anderson",     "0912345678"),
    ("P004", "user3@gmail.com",                "Emily Thompson",      "0923456789"),
    ("P005", NULL,                "Emily Thompson",      "0938240359");

DROP TABLE IF EXISTS `Account`;
CREATE TABLE IF NOT EXISTS `Account`(
    `id`                VARCHAR(10)    PRIMARY KEY,
    `Password`          NVARCHAR(800)                               	                NOT NULL,
    `Email`             NVARCHAR(255)                   UNIQUE,
    `CreatedAt`         DATETIME                                    	                NOT NULL,
    `Role`              ENUM("ADMIN", "USER")    NOT NULL,
    `Status`            ENUM("ACTIVE", "INACTIVE", "BANNED")                            NOT NULL,
    `ProfileId`         VARCHAR(10)                                               	    NOT NULL,
    FOREIGN KEY (`ProfileId`) REFERENCES `Profile`(`Id`)
);


INSERT INTO `Account` (`id`, `Password`, `Email`, `CreatedAt`, `Status`, `Role`, `ProfileId`) 
VALUES 
    ("P001", "$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi", "admin@gmail.com", "2024-03-01 08:30:00", "ACTIVE", "ADMIN", "P001"),
    ("P002", "$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi", "user1@gmail.com", "2024-03-02 09:15:00", "ACTIVE", "USER", "P002"),
    ("P003", "$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi", "user2@gmail.com", "2024-03-03 10:45:00", "INACTIVE", "USER", "P003"),
    ("P004", "$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi", "user3@gmail.com", "2024-03-04 14:00:00", "ACTIVE", "USER", "P004");
    
CREATE TABLE `City` (
    `id` 		VARCHAR(10) PRIMARY KEY, 
    `name` 		VARCHAR(255) NOT NULL,  
    `createdAt` TIMESTAMP 	, 
    `updatedAt` TIMESTAMP 	,  
    `status`    ENUM("ACTIVE", "INACTIVE") 
);

INSERT INTO `City` (`id`, `name`, `createdAt`, `updatedAt`, `status`) VALUES
('HANOI', 'Hà Nội', NOW(), NOW(), 'ACTIVE'),
('HCM', 'Hồ Chí Minh', NOW(), NOW(), 'ACTIVE'),
('DANANG', 'Đà Nẵng', NOW(), NOW(), 'ACTIVE'),
('NHATRANG', 'Nha Trang', NOW(), NOW(), 'ACTIVE'),
('HAIPHONG', 'Hải Phòng', NOW(), NOW(), 'ACTIVE');


CREATE TABLE `CoachStation` (
    `id` VARCHAR(10) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP ,
    `updatedAt` TIMESTAMP ,
    `longitude` DECIMAL(10,6) NOT NULL,
    `latitude` DECIMAL(10,6) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL ,
    
	`cityId` VARCHAR(10) NOT NULL,
    FOREIGN KEY (`cityId`) REFERENCES `City` (`id`) ON DELETE CASCADE
);


INSERT INTO `CoachStation` (`id`, `name`, `address`, `cityId`, `createdAt`, `updatedAt`, `longitude`, `latitude`, `status`) VALUES
('BX001', 'My Dinh Bus Station', 'Nam Tu Liem, Hanoi', 'HANOI', NOW(), NOW(), 105.7765, 21.0285, 'ACTIVE'),
('BX002T', 'Giap Bat Bus Station', 'Hoang Mai, Hanoi', 'HANOI', NOW(), NOW(), 105.8461, 20.9801, 'ACTIVE'),
('BX003', 'Mien Dong Bus Station', 'Binh Thanh, Ho Chi Minh City', 'HCM', NOW(), NOW(), 106.7153, 10.8231, 'ACTIVE'),
('BX004', 'Mien Tay Bus Station', 'Binh Tan, Ho Chi Minh City', 'HCM', NOW(), NOW(), 106.6206, 10.7387, 'SUSPENDED'),
('BX005', 'Da Nang Central Bus Station', 'Lien Chieu, Da Nang', 'DANANG', NOW(), NOW(), 108.1790, 16.0751, 'INACTIVE');





    
