-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: boulder-tracker-db.cn7nz4spdrrn.us-west-2.rds.amazonaws.com    Database: boulderTracker
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `climbs`
--

DROP TABLE IF EXISTS `climbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `climbs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `boulderId` int NOT NULL,
  `sessionId` int NOT NULL,
  `attempts` int NOT NULL,
  `sends` int NOT NULL,
  `climbStartTime` datetime NOT NULL,
  `climbEndTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `boulderId_idx` (`boulderId`),
  KEY `sessionId_idx` (`sessionId`),
  CONSTRAINT `boulderId` FOREIGN KEY (`boulderId`) REFERENCES `boulders` (`id`),
  CONSTRAINT `sessionId` FOREIGN KEY (`sessionId`) REFERENCES `sessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `climbs`
--

LOCK TABLES `climbs` WRITE;
/*!40000 ALTER TABLE `climbs` DISABLE KEYS */;
INSERT INTO `climbs` VALUES (29,11,11,1,1,'2023-10-08 00:34:00','2023-10-08 00:34:00'),(30,12,11,1,1,'2023-10-08 00:35:00','2023-10-08 00:35:00'),(31,13,11,1,1,'2023-10-08 00:35:00','2023-10-08 00:35:00'),(32,14,11,1,0,'2023-10-08 00:35:00','2023-10-08 00:35:00'),(33,15,11,1,0,'2023-10-08 00:36:00','2023-10-08 00:36:00'),(34,17,11,1,1,'2023-10-08 00:36:00','2023-10-08 00:36:00'),(35,18,11,2,1,'2023-10-08 00:36:00','2023-10-08 00:36:00'),(36,19,11,5,0,'2023-10-08 00:36:00','2023-10-08 00:36:00'),(37,20,11,2,2,'2023-10-08 00:36:00','2023-10-08 00:36:00'),(38,22,11,2,1,'2023-10-08 00:37:00','2023-10-08 00:37:00'),(39,23,11,2,1,'2023-10-08 00:37:00','2023-10-08 00:37:00'),(40,24,11,2,1,'2023-10-08 00:37:00','2023-10-08 00:37:00'),(41,25,11,1,0,'2023-10-08 00:37:00','2023-10-08 00:37:00'),(42,27,11,1,1,'2023-10-08 00:37:00','2023-10-08 00:37:00'),(43,28,11,1,1,'2023-10-08 00:37:00','2023-10-08 00:37:00'),(54,38,43,1,1,'2023-10-13 19:43:00','2023-10-13 19:43:00'),(55,39,43,1,1,'2023-10-13 22:59:00','2023-10-13 22:59:00'),(56,40,43,1,1,'2023-10-13 23:00:00','2023-10-13 23:00:00'),(57,41,43,1,1,'2023-10-13 23:00:00','2023-10-13 23:00:00'),(58,42,43,1,1,'2023-10-13 23:00:00','2023-10-13 23:00:00'),(59,43,43,1,1,'2023-10-13 23:00:00','2023-10-13 23:00:00'),(60,47,43,1,1,'2023-10-13 23:00:00','2023-10-13 23:00:00'),(61,48,43,1,1,'2023-10-13 23:00:00','2023-10-13 23:00:00'),(62,44,43,1,1,'2023-10-13 23:00:00','2023-10-13 23:00:00'),(63,45,43,1,1,'2023-10-13 23:01:00','2023-10-13 23:01:00'),(64,46,43,1,1,'2023-10-13 23:01:00','2023-10-13 23:01:00'),(65,51,43,2,0,'2023-10-13 23:01:00','2023-10-13 23:01:00'),(66,49,43,1,1,'2023-10-13 23:01:00','2023-10-13 23:01:00'),(67,50,43,2,1,'2023-10-13 23:01:00','2023-10-13 23:01:00'),(68,53,43,2,0,'2023-10-13 23:01:00','2023-10-13 23:01:00'),(69,54,43,8,0,'2023-10-13 23:02:00','2023-10-13 23:02:00');
/*!40000 ALTER TABLE `climbs` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-14 17:23:58
