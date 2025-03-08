DROP DATABASE IF EXISTS `SGU_J2EE`;
CREATE DATABASE IF NOT EXISTS `SGU_J2EE`;
USE `SGU_J2EE`;

DROP TABLE IF EXISTS `Profile`;
CREATE TABLE IF NOT EXISTS `Profile`(
    `id`            		VARCHAR(10)                     PRIMARY KEY,
    `Email`         		NVARCHAR(255)                   UNIQUE,
    `Fullname`      		NVARCHAR(255),
    `Phone`         		NVARCHAR(20)                    UNIQUE
);


INSERT INTO `Profile` (`id`, `Email`, `Fullname`, `Phone`) 
VALUES 
    ("P001", "admin@gmail.com",             "David Johnson",       "0123456789"),
    ("P002", "businessManager@gmail.com",   "Sophia Martinez",     "0987654321"),
    ("P003", "inventoryManager@gmail.com",  "Robert Anderson",     "0912345678"),
    ("P004", "hr@gmail.com",                "Emily Thompson",      "0923456789");

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
    ("P002", "$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi", "businessManager@gmail.com", "2024-03-02 09:15:00", "ACTIVE", "USER", "P002"),
    ("P003", "$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi", "inventoryManager@gmail.com", "2024-03-03 10:45:00", "INACTIVE", "USER", "P003"),
    ("P004", "$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi", "hr@gmail.com", "2024-03-04 14:00:00", "ACTIVE", "USER", "P004");