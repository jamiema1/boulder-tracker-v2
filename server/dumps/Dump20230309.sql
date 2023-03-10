-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: boulder-tracker
-- ------------------------------------------------------
-- Server version	8.0.32

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

--
-- Table structure for table `boulders`
--

DROP TABLE IF EXISTS `boulders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boulders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `rating` int NOT NULL,
  `colour` varchar(10) NOT NULL,
  `holdType` varchar(45) NOT NULL,
  `boulderType` varchar(45) NOT NULL,
  `sendAttempts` int NOT NULL,
  `startDate` date DEFAULT NULL,
  `sendDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=332 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boulders`
--

LOCK TABLES `boulders` WRITE;
/*!40000 ALTER TABLE `boulders` DISABLE KEYS */;
INSERT INTO `boulders` VALUES (140,'Warmup',1,'blue','jug volume','slab',1,'2023-02-20','2023-02-20'),(144,'Greasy holds + lots of upper body',3,'black','edge volume','overhang',1,'2023-02-20',NULL),(146,'The intended beta is to go to the right, I went left',3,'black','crimp edge side pull sloper volume','slab',1,'2023-02-20','2023-02-20'),(147,'Easier to campus than to keep feet engaged',2,'purple','mini-jug','overhang',1,'2023-02-20','2023-02-20'),(164,'Cool drop knee at the finish',2,'green','jug volume','aretes',1,'2023-02-20','2023-02-20'),(165,'Hard to keep tension when standing on the volume',4,'green','pinch side-pull undercling volume','slab',8,'2023-01-26','2023-02-20'),(171,'3 very powerful catch moves',4,'green','pinch side-pull','overhang',2,'2023-02-20','2023-02-20'),(172,'Very easy 4',4,'green','crimp pinch volume','slab',1,'2023-02-20','2023-02-20'),(176,'Really awkward start and finish',3,'purple','crimp pinch sloper volume','slab',3,'2023-02-20','2023-02-20'),(177,'All small ledges with small feet holds',3,'red','crimp edge','slab',2,'2023-02-20','2023-02-20'),(178,'Very compressed body positions + grabbing volumes',3,'black','volume','overhang',2,'2023-02-20','2023-02-20'),(179,'Awkward compression position at the start',2,'pink','mini-jug sloper','overhang',2,'2023-02-20','2023-02-20'),(180,'warmup',2,'pink','horn mini-jug sloper volume','slab',1,'2023-02-20','2023-02-20'),(181,'Last move is too sketchy',3,'yellow','crimp edge volume','slab',1,'2023-02-20',NULL),(182,'Very small feet holds',3,'blue','crimp sloper volume','slab',2,'2023-02-20','2023-02-20'),(183,'Very close, just have to make the last move',4,'black','jug pinch side-pull undercling','overhang',9,'2023-02-16','2023-03-02'),(184,'Fun climb, have to go slow to maintain balance',4,'pink','sloper volume','slab',5,'2023-02-16','2023-02-16'),(185,'Straightforward climb',3,'orange','jug pinch side-pull','slab',1,'2023-02-16','2023-02-16'),(186,'Got to the last move with one hand, but couldn\'t match',4,'blue','sloper volume','overhang',10,'2023-01-19',NULL),(187,'Just a bunch of small edges/crimps',4,'yellow','crimp','slab',7,'2023-01-19','2023-01-29'),(188,'Really small hand and feet holds',3,'orange','crimp','slab',2,'2023-02-12','2023-02-12'),(189,'Fun, flowy climb',3,'pink','mini-jug sloper volume','slab',1,'2023-02-12','2023-02-12'),(190,'Lots of catch moves, very powerful',3,'orange','crimp mini-jug sloper','slab',2,'2023-02-12','2023-02-12'),(191,'Interesting start with no feet holds',3,'pink','edge mini-jug volume','overhang',1,'2023-02-16','2023-02-16'),(192,'Dyno + mantle',3,'blue','edge jug','slab',2,'2023-02-12','2023-02-12'),(193,'Tricky catch move at the beginning',4,'orange','jug mini-jug undercling volume','overhang',4,'2023-01-15','2023-01-19'),(194,'Very small finger pockets + bad feet',3,'yellow','crimp pocket','overhang',2,'2023-01-15','2023-01-15'),(195,'Start is was a bit tricky when trying to layback',3,'blue','edge jug volume','overhang',4,'2023-01-15','2023-01-15'),(196,'Requires a compression start which is difficult for shorter wingspans',3,'black','edge side-pull volume','overhang',6,'2023-01-15','2023-01-19'),(197,'Easy once you know the beta',4,'pink','mini-jug pinch','slab',6,'2023-01-19','2023-01-26'),(198,'Requires a bathang-like maneuver around a big ball to start',4,'blue','jug pinch volume','overhang',7,'2023-01-15','2023-01-26'),(199,'Very sketchy feet holds into a semi-dynamic move to cross',4,'orange','crimp sloper volume','slab',8,'2023-01-15','2023-01-26'),(200,'Fairly easy 4',4,'purple','jug mini-jug undercling volume','overhang',2,'2023-02-12','2023-02-12'),(201,'Easy to campus than to try and keep feet on',1,'yellow','crimp edge','overhang',1,'2023-02-12','2023-02-12'),(202,'Easy 3',3,'orange','jug','overhang',1,'2023-02-12','2023-02-12'),(203,'Campus style start into a far reach to a pinch',4,'black','edge jug pinch volume','overhang',5,'2023-02-12',NULL),(204,'Cool compression start into a backwards dyno',3,'blue','jug mini-jug volume','overhang',1,'2023-02-12','2023-02-12'),(205,'Funky start that requires you to face away from the wall and use compression',2,'orange','jug sloper','overhang',1,'2023-02-23','2023-02-23'),(206,'Cool toe hook start + press up finish',3,'yellow','edge horn','slab',3,'2023-02-23','2023-02-23'),(207,'Very awkward positions the entire time',3,'blue','edge mini-jug sloper volume','slab',8,'2023-01-19','2023-01-29'),(208,'Straight muscleup',4,'black','edge volume','slab',3,'2023-01-19','2023-01-29'),(209,'Fun dyno',3,'black','jug','slab',1,'2023-01-26','2023-01-26'),(210,'Awkward dyno due to takeoff and landing + hard finish move',4,'blue','jug','slab',10,'2023-01-26','2023-01-12'),(211,'Far reach to finish\n',2,'green','jug mini-jug','overhang',1,'2023-02-12','2023-02-23'),(212,'Interesting big holds',3,'green','pinch sloper','slab',2,'2023-02-12','2023-02-12'),(213,'A few catches to large bowls',3,'black','edge mini-jug','overhang',1,'2023-02-23','2023-02-23'),(214,'Don\'t know how to do the first move',4,'blue','crimp edge','slab',10,'2023-02-23','2023-03-02'),(215,'Hard transition to the big bowl sloper',-1,'black','mini-jug sloper','slab',3,'2023-02-23',NULL),(216,'warmup',2,'green','jug volume','slab',1,'2023-02-23','2023-02-23'),(217,'Don\'t know how to do the first move',5,'orange','mini-jug volume','aretes',3,'2023-02-23',NULL),(218,'warmup',1,'orange','jug','slab',1,'2023-02-25','2023-02-25'),(219,'warmup',1,'pink','edge jug','overhang',1,'2023-02-25','2023-02-25'),(220,'easy 2',2,'green','jug','slab',1,'2023-02-04','2023-02-04'),(221,'Awkward finish position that is hard to keep balance on',3,'black','jug mini-jug sloper volume','slab',4,'2023-02-04','2023-02-04'),(222,'start position is like Spiderman where you have to inch upwards a bit to the finish',3,'black','sloper volume','aretes',1,'2023-02-04','2023-02-04'),(223,'Very small feet holds + greasy hand holds makes it difficult',4,'blue','crimp edge sloper volume','slab',10,'2023-02-04',NULL),(224,'Campus burnout',1,'yellow','edge jug','overhang',1,'2023-02-25','2023-02-25'),(225,'Holds are ok slopers',3,'pink','mini-jug sloper','slab',1,'2023-02-04','2023-02-04'),(226,'Hard to maintain balance in the finish position due to it being a sloper',4,'purple','side-pull sloper volume','overhang',6,'2023-02-04','2023-02-25'),(227,'First move is a campus to a crimp',5,'green','crimp jug','slab',4,'2023-02-04',NULL),(228,'Initial dyno is harder to land than it looks',3,'blue','jug pinch pocket','overhang',4,'2023-02-25','2023-02-25'),(229,'Holds are a lot worse than they look',3,'green','pinch sloper volume','slab',2,'2023-02-25',NULL),(230,'Very technical climb that requires a lot of precision to stay balanced. Finish is a tough two finger match while doing the splits.',4,'yellow','crimp pinch sloper volume','slab',8,'2023-02-25','2023-02-25'),(231,'Just a bunch of pinches',3,'blue','pinch volume','overhang',1,'2023-02-25','2023-02-25'),(232,'Straighforward 3',3,'yellow','edge horn pinch','slab',1,'2023-02-04','2023-02-04'),(233,'warmup + can be done with no hands',1,'orange','edge','aretes',1,'2023-02-04','2023-02-04'),(234,'Hard crimpy start',4,'purple','crimp pocket','slab',2,'2023-02-04','2023-02-04'),(235,'Last move is a bit hard to stick onto the sloper',4,'black','sloper undercling volume','slab',5,'2023-02-04','2023-02-04'),(236,'Heel hooks during the transition area where you are completely horizontal makes it a bit easier',4,'purple','jug mini-jug','overhang',8,'2023-02-04','2023-02-04'),(237,'Straightforward 2',2,'orange','edge undercling','overhang',1,'2023-02-25','2023-02-25'),(238,'Warmup',2,'purple','edge sloper','slab',1,'2023-02-25','2023-02-25'),(265,'warmup',1,'purple','jug side-pull volume','slab',1,'2023-03-02','2023-03-02'),(266,'start is a bit tricky, but not too bad otherwise',3,'purple','sloper volume','slab',1,'2023-03-02','2023-03-02'),(267,'should have used better technique rather than campusing sections',3,'purple','jug mini-jug sloper volume','overhang',1,'2023-03-02','2023-03-02'),(268,'awkward finish position',2,'blue','jug volume','overhang',1,'2023-02-16','2023-02-16'),(269,'hard transition move in the middle',-1,'blue','mini-jug pocket','overhang',7,'2023-03-02',NULL),(270,'Permanently in a layback position',-1,'yellow','jug side-pull','overhang',1,'2023-03-02','2023-03-02'),(271,'First move is difficult due to not being able to reach the next volume with the chip on it',4,'yellow','pinch side-pull volume','slab',3,'2023-03-02',NULL),(272,'Skin killer',4,'black','pinch sloper','overhang',2,'2023-03-02',NULL),(273,'hard to keep tension during the second move to the crimp',4,'orange','crimp sloper','slab',4,'2023-02-16',NULL),(274,'Lots of heel hooks + skin killer slopers',4,'orange','crimp sloper volume','overhang',1,'2023-02-16',NULL),(276,'warmup',1,'blue','jug','slab',1,'2023-03-04','2023-03-04'),(277,'warmup',1,'yellow','jug','slab',1,'2023-03-04','2023-03-04'),(278,'interesting gumdrop holds',2,'black','mini-jug','slab',1,'2023-03-04','2023-03-04'),(279,'Crux move revolves around grabbing both sides of the big sloper',3,'purple','mini-jug sloper','slab',1,'2023-03-04','2023-03-04'),(280,'the start is very tricky as it requires a high foot + a mantle into a pistol squat. The rest is easy.',3,'blue','edge jug sloper volume','slab',3,'2023-03-04','2023-03-04'),(281,'Just need to come back fresh to land the dyno to the last hold',4,'yellow','pinch sloper','slab',8,'2023-03-04','2023-03-09'),(282,'Able to do the finish, but the start dyno is still a WIP.',3,'blue','jug pinch side-pull sloper volume','slab',8,'2023-03-04',NULL),(283,'Cooldown',1,'green','jug sloper','slab',1,'2023-03-04','2023-03-04'),(284,'Lots of balance and precise body positioning required',3,'orange','side-pull sloper','slab',1,'2023-03-04','2023-03-04'),(285,'Knee bar opportunity',3,'purple','edge jug undercling volume','overhang',1,'2023-03-04','2023-03-04'),(286,'Dyno to the pocket is very hard to stick + subsequent moves are hard',4,'green','crimp jug pocket side-pull volume','overhang',5,'2023-03-04',NULL),(287,'Step up dyno into a compression, next move is a dyno with bad feet holds',4,'pink','jug pinch','slab',4,'2023-03-04',NULL),(288,'Can\'t figure out how to move out of the start',4,'yellow','crimp sloper volume','slab',2,'2023-03-04',NULL),(289,'Toe hook makes the beginning possible, but the ending is still a mystery',4,'yellow','crimp jug','overhang',5,'2023-03-04',NULL),(290,'Too tired to do at this point',3,'orange','crimp pocket side-pull volume','slab',1,'2023-03-04',NULL),(291,'Jump start into a compression. Just need to come back another day when I\'m fresh',4,'blue','sloper volume','slab',8,'2023-03-04','2023-03-09'),(292,'Easy 4',4,'orange','crimp edge volume','slab',1,'2023-03-04','2023-03-04'),(293,'A 3-mover, where the last move looks like an impossible dyno',4,'orange','crimp volume','overhang',4,'2023-03-04',NULL),(321,'warmup',1,'yellow','jug','overhang',1,'2023-03-09','2023-03-09'),(322,'warmup',2,'black','pinch side-pull sloper','slab',1,'2023-03-09','2023-03-09'),(323,'warmup',2,'black','jug side-pull','slab',1,'2023-03-09','2023-03-09'),(324,'Really bad feet holds make it hard to keep tension + pull and reach is a bit too far for me',4,'pink','crimp edge volume','slab',6,'2023-03-09',NULL),(325,'Don\'t know how to progress after the first move, as everything looks too far away',4,'black','jug sloper','overhang',3,'2023-03-09',NULL),(326,'break climb',2,'pink','mini-jug','slab',1,'2023-03-09','2023-03-09'),(327,'Hard 3, a lot of the moves look very difficult due to compressions/far reaches',3,'green','edge sloper','slab',2,'2023-03-09',NULL),(328,'Easy 3',3,'green','mini-jug volume','slab',1,'2023-03-09','2023-03-09'),(329,'Intended beta is to do it statically, but a dyno made it easier. Most likely a 4.',-1,'purple','crimp mini-jug pinch','slab',10,'2023-03-09','2023-03-09'),(330,'Campusing the middle section probably is not the intended beta',4,'black','crimp edge','overhang',2,'2023-03-09','2023-03-09'),(331,'break climb',1,'yellow','edge mini-jug pocket','slab',1,'2023-03-09','2023-03-09');
/*!40000 ALTER TABLE `boulders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gyms`
--

DROP TABLE IF EXISTS `gyms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gyms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `visits` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gyms`
--

LOCK TABLES `gyms` WRITE;
/*!40000 ALTER TABLE `gyms` DISABLE KEYS */;
INSERT INTO `gyms` VALUES (1,'Hive Surrey',NULL,'Surrey',1);
/*!40000 ALTER TABLE `gyms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-09 18:17:37
