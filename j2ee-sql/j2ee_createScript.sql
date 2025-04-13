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
    `createdAt` DATETIME 	, 
    `updatedAt` DATETIME 	,  
    `status`    ENUM("ACTIVE", "INACTIVE") 
);

INSERT INTO `City` (`id`, `name`, `createdAt`, `updatedAt`, `status`) VALUES
('HANOI', 'Hà Nội', NOW(), NOW(), 'ACTIVE'),
('HCM', 'Hồ Chí Minh', NOW(), NOW(), 'ACTIVE'),
('DANANG', 'Đà Nẵng', NOW(), NOW(), 'ACTIVE'),
('NHATRANG', 'Nha Trang', NOW(), NOW(), 'ACTIVE'),
('HAIPHONG', 'Hải Phòng', NOW(), NOW(), 'INACTIVE');


CREATE TABLE `CoachStation` (
    `id` VARCHAR(10) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME ,
    `updatedAt` DATETIME ,
    `longitude` DECIMAL(10,6) NOT NULL,
    `latitude` DECIMAL(10,6) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL ,
    
	`cityId` VARCHAR(10) NOT NULL,
    FOREIGN KEY (`cityId`) REFERENCES `City` (`id`) ON DELETE CASCADE
);


INSERT INTO `CoachStation` (`id`, `name`, `address`, `cityId`, `createdAt`, `updatedAt`, `longitude`, `latitude`, `status`) VALUES
('BX001', 'My Dinh Bus Station', 'Nam Tu Liem, Hanoi', 'HANOI', NOW(), NOW(), 105.7765, 21.0285, 'ACTIVE'),
('BX002', 'Giap Bat Bus Station', 'Hoang Mai, Hanoi', 'HANOI', NOW(), NOW(), 105.8461, 20.9801, 'ACTIVE'),
('BX003', 'Mien Dong Bus Station', 'Binh Thanh, Ho Chi Minh City', 'HCM', NOW(), NOW(), 106.7153, 10.8231, 'ACTIVE'),
('BX004', 'Mien Tay Bus Station', 'Binh Tan, Ho Chi Minh City', 'HCM', NOW(), NOW(), 106.6206, 10.7387, 'SUSPENDED'),
('BX005', 'Da Nang Central Bus Station', 'Lien Chieu, Da Nang', 'DANANG', NOW(), NOW(), 108.1790, 16.0751, 'INACTIVE');


CREATE TABLE `Coach` (
    `id` VARCHAR(10) PRIMARY KEY,
    `capacity` INT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `licensePlate` VARCHAR(50) UNIQUE NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE') NOT NULL
);

INSERT INTO `Coach` (`id`, `capacity`, `type`, `licensePlate`, `status`) VALUES
    ('C001', 45, 'Sleeper Bus', '51B-12345', 'ACTIVE'),
    ('C002', 30, 'Seated Bus', '51C-67890', 'INACTIVE'),
    ('C003', 50, 'Premium Sleeper', '50A-54321', 'MAINTENANCE'),
    ('C004', 40, 'Limousine VIP', '60D-11223', 'ACTIVE'),
    ('C005', 35, 'Seated Bus', '62E-44556', 'ACTIVE'),
    ('C006', 42, 'Sleeper Bus', '53G-99887', 'ACTIVE'),
    ('C007', 16, 'Limousine VIP', '59F-33445', 'MAINTENANCE'),
    ('C008', 28, 'Seated Bus', '49H-66778', 'INACTIVE');

                        
CREATE TABLE `Seat` (
    `id` VARCHAR(10) PRIMARY KEY,
    `number` INT NOT NULL,
    `type` ENUM('NORMAL', 'VIP') NOT NULL,
    `isNextToWindow` BOOLEAN NOT NULL,
    `floor` INT NOT NULL,
    `coachId` VARCHAR(10) NOT NULL,
    FOREIGN KEY (`coachId`) REFERENCES `Coach`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `Seat` (`id`, `number`, `type`, `isNextToWindow`, `floor`, `coachId`) VALUES
    ('S001', 1, 'NORMAL', TRUE, 1, 'C001'),
    ('S002', 2, 'NORMAL', FALSE, 1, 'C001'),
    ('S003', 3, 'VIP', TRUE, 1, 'C001'),
    ('S004', 4, 'NORMAL', FALSE, 2, 'C002'),
    ('S005', 5, 'NORMAL', TRUE, 2, 'C002'),
    ('S006', 6, 'VIP', TRUE, 1, 'C003'),
    ('S007', 7, 'NORMAL', FALSE, 1, 'C003'),
    ('S008', 8, 'NORMAL', TRUE, 2, 'C004'),
    ('S009', 9, 'VIP', TRUE, 1, 'C005'),
    ('S010', 10, 'NORMAL', FALSE, 1, 'C005'),
    ('S011', 11, 'NORMAL', TRUE, 1, 'C006'),
    ('S012', 12, 'VIP', TRUE, 2, 'C006'),
    ('S013', 13, 'NORMAL', FALSE, 1, 'C007'),
    ('S014', 14, 'NORMAL', TRUE, 1, 'C007'),
    ('S015', 15, 'VIP', TRUE, 2, 'C008'),
    ('S016', 16, 'NORMAL', FALSE, 2, 'C008');


CREATE TABLE `Route` (
    `id` VARCHAR(10) PRIMARY KEY,
    `price` DECIMAL(10,2) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL,
    `updatedAt` TIMESTAMP NOT NULL,
    `duration` INT NOT NULL,
    `distance` DECIMAL(10,2) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE') NOT NULL,
    `departureStationId` VARCHAR(10) NOT NULL,
    `arrivalStationId` VARCHAR(10) NOT NULL,
    FOREIGN KEY (`departureStationId`) REFERENCES `CoachStation`(`id`),
    FOREIGN KEY (`arrivalStationId`) REFERENCES `CoachStation`(`id`)
);


INSERT INTO `Route` (`id`, `price`, `createdAt`, `updatedAt`, `duration`, `distance`, `status`, `departureStationId`, `arrivalStationId`) VALUES
    ('R001', 150000, NOW(), NOW(), 180, 150.5, 'ACTIVE', 'BX001', 'BX002'),
    ('R002', 200000, NOW(), NOW(), 240, 200.0, 'ACTIVE', 'BX002', 'BX003'),
    ('R003', 180000, NOW(), NOW(), 210, 180.2, 'MAINTENANCE', 'BX003', 'BX004'),
    ('R004', 220000, NOW(), NOW(), 300, 250.7, 'INACTIVE', 'BX004', 'BX005'),
    ('R005', 175000, NOW(), NOW(), 190, 160.3, 'ACTIVE', 'BX005', 'BX001');



CREATE TABLE `Schedule` (
    `id` VARCHAR(10) NOT NULL,
    `arrivalTime` DATETIME NOT NULL,
    `departureTime` DATETIME NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'CANCELLED') NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `routeId` VARCHAR(10) NOT NULL,
    `coachId` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`coachId`) REFERENCES `Coach`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


-- 5 Schedule trong quá khứ
INSERT INTO `Schedule` (`id`, `arrivalTime`, `departureTime`, `status`, `createdAt`, `updatedAt`, `routeId`, `coachId`) VALUES
    ('S001', '2024-08-01 10:30:00', '2024-08-01 07:30:00', 'ACTIVE', NOW(), NOW(), 'R001', 'C001'),
    ('S002', '2024-08-02 15:00:00', '2024-08-02 11:00:00', 'ACTIVE', NOW(), NOW(), 'R002', 'C002'),
    ('S003', '2024-08-03 18:45:00', '2024-08-03 15:45:00', 'CANCELLED', NOW(), NOW(), 'R003', 'C003'),
    ('S004', '2024-08-04 09:15:00', '2024-08-04 06:15:00', 'INACTIVE', NOW(), NOW(), 'R004', 'C004'),
    ('S005', '2024-08-05 13:00:00', '2024-08-05 09:00:00', 'ACTIVE', NOW(), NOW(), 'R005', 'C005');

-- 5 Schedule trong tương lai
INSERT INTO `Schedule` (`id`, `arrivalTime`, `departureTime`, `status`, `createdAt`, `updatedAt`, `routeId`, `coachId`) VALUES
    ('S006', '2024-08-10 17:30:00', '2024-08-10 14:30:00', 'ACTIVE', NOW(), NOW(), 'R001', 'C006'),
    ('S007', '2024-08-11 22:15:00', '2024-08-11 18:15:00', 'ACTIVE', NOW(), NOW(), 'R002', 'C007'),
    ('S008', '2024-08-12 06:00:00', '2024-08-12 03:00:00', 'INACTIVE', NOW(), NOW(), 'R003', 'C008'),
    ('S009', '2024-08-13 14:20:00', '2024-08-13 11:20:00', 'ACTIVE', NOW(), NOW(), 'R004', 'C001'),
    ('S010', '2024-08-14 08:45:00', '2024-08-14 05:45:00', 'ACTIVE', NOW(), NOW(), 'R005', 'C002');


CREATE TABLE `Invoice` (
    `id` VARCHAR(10) PRIMARY KEY,
    `totalAmount` DECIMAL(10,2) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `paymentMethod` ENUM('CASH', 'CREDIT_CARD', 'BANK_TRANSFER') NOT NULL,
    `paymentStatus` ENUM('PENDING', 'PAID', 'CANCELLED') NOT NULL,
    `profileId` VARCHAR(10) NOT NULL,
    FOREIGN KEY (`profileId`) REFERENCES `Profile` (`id`)
);

INSERT INTO `Invoice` (`id`, `totalAmount`, `createdAt`, `paymentMethod`, `paymentStatus`, `profileId`) VALUES
    ('I001', 500000, NOW(), 'CREDIT_CARD', 'PAID', 'P001'),
    ('I002', 750000, NOW(), 'CASH', 'PENDING', 'P002'),
    ('I003', 600000, NOW(), 'BANK_TRANSFER', 'PAID', 'P003'),
    ('I004', 450000, NOW(), 'CREDIT_CARD', 'CANCELLED', 'P004'),
    ('I005', 900000, NOW(), 'CASH', 'PAID', 'P005');


CREATE TABLE `Ticket` (
    `id` VARCHAR(10) PRIMARY KEY,
    `status` ENUM('BOOKED', 'CANCELLED', 'USED') NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `invoiceId` VARCHAR(10) NOT NULL,
    `scheduleId` VARCHAR(10) NOT NULL,
    `seatId` VARCHAR(10) NOT NULL,
    FOREIGN KEY (`invoiceId`) REFERENCES `Invoice` (`id`),
    FOREIGN KEY (`scheduleId`) REFERENCES `Schedule` (`id`),
    FOREIGN KEY (`seatId`) REFERENCES `Seat` (`id`)
);


INSERT INTO `Ticket` (`id`, `status`, `price`, `createdAt`, `updatedAt`, `invoiceId`, `scheduleId`, `seatId`) VALUES
    ('T001', 'BOOKED', 150000, NOW(), NOW(), 'I001', 'S001', 'S001'),
    ('T002', 'CANCELLED', 200000, NOW(), NOW(), 'I002', 'S002', 'S002'),
    ('T003', 'USED', 180000, NOW(), NOW(), 'I003', 'S003', 'S003'),
    ('T004', 'BOOKED', 220000, NOW(), NOW(), 'I004', 'S004', 'S004'),
    ('T005', 'BOOKED', 175000, NOW(), NOW(), 'I005', 'S005', 'S005'),
    ('T006', 'CANCELLED', 190000, NOW(), NOW(), 'I005', 'S006', 'S006'),
    ('T007', 'USED', 160000, NOW(), NOW(), 'I005', 'S007', 'S007'),
    ('T008', 'BOOKED', 140000, NOW(), NOW(), 'I005', 'S008', 'S008'),
    ('T009', 'BOOKED', 210000, NOW(), NOW(), 'I005', 'S009', 'S009'),
    ('T010', 'USED', 130000, NOW(), NOW(), 'I005', 'S010', 'S010');

    
