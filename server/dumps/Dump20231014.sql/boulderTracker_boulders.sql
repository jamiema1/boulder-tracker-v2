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
-- Table structure for table `boulders`
--

DROP TABLE IF EXISTS `boulders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boulders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `locationId` int NOT NULL,
  `rating` int NOT NULL,
  `colour` varchar(45) NOT NULL,
  `boulderType` varchar(45) NOT NULL,
  `description` varchar(256) NOT NULL,
  `setStartDate` date NOT NULL,
  `setEndDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `locationId_idx` (`locationId`),
  CONSTRAINT `locationId` FOREIGN KEY (`locationId`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boulders`
--

LOCK TABLES `boulders` WRITE;
/*!40000 ALTER TABLE `boulders` DISABLE KEYS */;
INSERT INTO `boulders` VALUES (11,13,1,'Yellow','Slab','Nice and easy warmup','2023-10-07','0000-00-00'),(12,13,2,'Purple','Slab','Interesting grape-like holds','2023-10-07','0000-00-00'),(13,13,2,'Black','Overhang','Involves a few powerful moves including some catches and pinches','2023-10-07','0000-00-00'),(14,13,4,'Pink','Slab','Bad rounded crimps','2023-10-07','0000-00-00'),(15,14,5,'Blue','Overhang','Very tough start with complete horizontal for 5+ moves','2023-10-07','0000-00-00'),(16,14,4,'Blue','Overhang','Really intense start, but straightforward crimps','2023-10-07','0000-00-00'),(17,14,2,'Yellow','Overhang','A lot harder than graded due to poor holds and constant overhand','2023-10-07','0000-00-00'),(18,14,3,'Red','Overhang','Very long with fairly good holds, key is to go fast before losing strength','2023-10-07','0000-00-00'),(19,15,4,'Pink','Slab','One mover dyno','2023-10-07','0000-00-00'),(20,14,3,'Green','Overhang','Bad pinch start into a tough reach on the second to last move','2023-10-07','0000-00-00'),(21,14,3,'Black','Overhang','Fun with lots of different moves: mantle, pinches, crimps, etc','2023-10-07','0000-00-00'),(22,15,4,'Red','Slab','Banana holds were pretty good and not too hard','2023-10-07','0000-00-00'),(23,15,3,'Green','Slab','Very reachy boulder with a nice heel hook finish','2023-10-07','0000-00-00'),(24,16,3,'Black','Slab','Cool boulder with lots of volumes','2023-10-07','0000-00-00'),(25,16,4,'Yellow','Slab','Weird sit start and far dyno move','2023-10-07','0000-00-00'),(27,18,4,'Black','Slab','Light 4, hard crimps at the beginning, but nothing too complex','2023-10-07','0000-00-00'),(28,19,1,'Pink','Overhang','Fun cool-down boulder','2023-10-07','0000-00-00'),(38,40,-1,'Black','Slab','chill climb with flowy feel','2023-10-13','0000-00-00'),(39,40,-1,'Blue','Slab','fun corner climb with the human hold','2023-10-13','0000-00-00'),(40,33,-1,'Black','Overhang','disc like holds made it a bit more challenging given how many holds there are','2023-10-13','0000-00-00'),(41,32,-1,'Green','Slab','only tricky part is the high heel at the end','2023-10-13','0000-00-00'),(42,31,-1,'Black','Slab','smaller ledges are surprisingly good','2023-10-13','0000-00-00'),(43,31,-1,'Pink','Slab','tricky one because of how balancy the boulder is, need to go nice and slow','2023-10-13','0000-00-00'),(44,30,3,'Black','Overhang','strong first move into two bad ledges','2023-10-13','0000-00-00'),(45,30,3,'Pink','Overhang','easy 3, cool momentum move at the beginning','2023-10-13','0000-00-00'),(46,30,3,'Green','Overhang','longer route makes it a bit more tiring','2023-10-13','0000-00-00'),(47,39,3,'Yellow','Slab','banana holds are pretty good','2023-10-13','0000-00-00'),(48,39,3,'Pink','Slab','walk over with left foot into standing is the superior beta','2023-10-13','0000-00-00'),(49,29,4,'Black','Overhang','pretty easy 4, all holds were very juggy','2023-10-13','0000-00-00'),(50,29,4,'Purple','Overhang','cool use of the volume to create a nice right hand','2023-10-13','0000-00-00'),(51,30,4,'Pink','Slab','tough pinches into a wide right hand','2023-10-13','0000-00-00'),(52,29,1,'Orange','Overhang','dino holds + very long route','2023-10-12','0000-00-00'),(53,29,4,'Yellow','Overhang','cool toe hook into a heel','2023-10-13','0000-00-00'),(54,38,4,'Yellow','Overhang','tough 3rd move, not too hard otherwise','2023-10-13','0000-00-00'),(55,27,3,'Orange','Overhang','TEST BOULDER 1','2023-10-13','0000-00-00'),(56,27,1,'Blue','Slab','TEST BOULDER 2','2023-10-06','0000-00-00'),(57,26,3,'Blue','Slab','Awkward as all holds at the top are side pulls in the same direction','2023-10-14','0000-00-00'),(58,26,2,'Yellow','Slab','Light warmup 2','2023-10-14','0000-00-00'),(59,26,3,'Orange','Slab','Holds are a lot better than they look','2023-10-14','0000-00-00'),(60,28,4,'Purple','Slab','Hard first dyno + bicep heavy stepup move into undercling','2023-10-14','0000-00-00'),(61,28,3,'Green','Slab','Very light 3','2023-10-14','0000-00-00'),(62,28,6,'Blue','Slab','','2023-10-14','0000-00-00'),(63,28,4,'Yellow','Slab','','2023-10-14','0000-00-00'),(64,28,5,'Purple','Slab','','2023-10-14','0000-00-00'),(65,28,2,'Orange','Slab','','2023-10-14','0000-00-00'),(66,41,-1,'Purple','Slab','','2023-10-14','0000-00-00'),(67,27,2,'Blue','Slab','TEST','2023-10-14','0000-00-00');
/*!40000 ALTER TABLE `boulders` ENABLE KEYS */;
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

-- Dump completed on 2023-10-14 17:23:57
