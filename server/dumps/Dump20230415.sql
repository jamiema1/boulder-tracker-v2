-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: boulder-tracker.cn7nz4spdrrn.us-west-2.rds.amazonaws.com    Database: boulderTracker
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
  `gymId` int DEFAULT NULL,
  `sessionId` int DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `colour` varchar(10) NOT NULL,
  `holdType` varchar(45) NOT NULL,
  `boulderType` varchar(45) NOT NULL,
  `sendAttempts` int NOT NULL,
  `startDate` date NOT NULL,
  `sendDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gymid_idx` (`gymId`),
  KEY `ids_idx` (`gymId`)
) ENGINE=InnoDB AUTO_INCREMENT=555 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boulders`
--

LOCK TABLES `boulders` WRITE;
/*!40000 ALTER TABLE `boulders` DISABLE KEYS */;
INSERT INTO `boulders` VALUES (140,0,0,'Warmup',1,'blue','jug volume','slab',1,'2023-02-20','2023-02-20'),(144,0,0,'Greasy holds + lots of upper body',3,'black','edge volume','overhang',1,'2023-02-20',NULL),(146,0,0,'The intended beta is to go to the right, I went left',3,'black','crimp edge side pull sloper volume','slab',1,'2023-02-20','2023-02-20'),(147,0,0,'Easier to campus than to keep feet engaged',2,'purple','mini-jug','overhang',1,'2023-02-20','2023-02-20'),(164,0,0,'Cool drop knee at the finish',2,'green','jug volume','aretes',1,'2023-02-20','2023-02-20'),(165,0,0,'Hard to keep tension when standing on the volume',4,'green','pinch side-pull undercling volume','slab',8,'2023-01-26','2023-02-20'),(171,0,0,'3 very powerful catch moves',4,'green','pinch side-pull','overhang',2,'2023-02-20','2023-02-20'),(172,0,0,'Very easy 4',4,'green','crimp pinch volume','slab',1,'2023-02-20','2023-02-20'),(176,0,0,'Really awkward start and finish',3,'purple','crimp pinch sloper volume','slab',3,'2023-02-20','2023-02-20'),(177,0,0,'All small ledges with small feet holds',3,'red','crimp edge','slab',2,'2023-02-20','2023-02-20'),(178,0,0,'Very compressed body positions + grabbing volumes',3,'black','volume','overhang',2,'2023-02-20','2023-02-20'),(179,0,0,'Awkward compression position at the start',2,'pink','mini-jug sloper','overhang',2,'2023-02-20','2023-02-20'),(180,0,0,'warmup',2,'pink','horn mini-jug sloper volume','slab',1,'2023-02-20','2023-02-20'),(181,0,0,'Last move is too sketchy',4,'yellow','crimp edge volume','slab',1,'2023-02-20',NULL),(182,0,0,'Very small feet holds',3,'blue','crimp sloper volume','slab',2,'2023-02-20','2023-02-20'),(183,0,0,'Very close, just have to make the last move',4,'black','jug pinch side-pull undercling','overhang',9,'2023-02-16','2023-03-02'),(184,0,0,'Fun climb, have to go slow to maintain balance',4,'pink','sloper volume','slab',5,'2023-02-16','2023-02-16'),(185,0,0,'Straightforward climb',3,'orange','jug pinch side-pull','slab',1,'2023-02-16','2023-02-16'),(186,0,0,'Got to the last move with one hand, but couldn\'t match',4,'blue','sloper volume','overhang',10,'2023-01-19',NULL),(187,0,0,'Just a bunch of small edges/crimps',4,'yellow','crimp','slab',7,'2023-01-19','2023-01-29'),(188,0,0,'Really small hand and feet holds',3,'orange','crimp','slab',2,'2023-02-12','2023-02-12'),(189,0,0,'Fun, flowy climb',3,'pink','mini-jug sloper volume','slab',1,'2023-02-12','2023-02-12'),(190,0,0,'Lots of catch moves, very powerful',3,'orange','crimp mini-jug sloper','slab',2,'2023-02-12','2023-02-12'),(191,0,0,'Interesting start with no feet holds',3,'pink','edge mini-jug volume','overhang',1,'2023-02-16','2023-02-16'),(192,0,0,'Dyno + mantle',3,'blue','edge jug','slab',2,'2023-02-12','2023-02-12'),(193,0,0,'Tricky catch move at the beginning',4,'orange','jug mini-jug undercling volume','overhang',4,'2023-01-15','2023-01-19'),(194,0,0,'Very small finger pockets + bad feet',3,'yellow','crimp pocket','overhang',2,'2023-01-15','2023-01-15'),(195,0,0,'Start is was a bit tricky when trying to layback',3,'blue','edge jug volume','overhang',4,'2023-01-15','2023-01-15'),(196,0,0,'Requires a compression start which is difficult for shorter wingspans',3,'black','edge side-pull volume','overhang',6,'2023-01-15','2023-01-19'),(197,0,0,'Easy once you know the beta',4,'pink','mini-jug pinch','slab',6,'2023-01-19','2023-01-26'),(198,0,0,'Requires a bathang-like maneuver around a big ball to start',4,'blue','jug pinch volume','overhang',7,'2023-01-15','2023-01-26'),(199,0,0,'Very sketchy feet holds into a semi-dynamic move to cross',4,'orange','crimp sloper volume','slab',8,'2023-01-15','2023-01-26'),(200,0,0,'Fairly easy 4',4,'purple','jug mini-jug undercling volume','overhang',2,'2023-02-12','2023-02-12'),(201,0,0,'Easy to campus than to try and keep feet on',1,'yellow','crimp edge','overhang',1,'2023-02-12','2023-02-12'),(202,0,0,'Easy 3',3,'orange','jug','overhang',1,'2023-02-12','2023-02-12'),(203,0,0,'Campus style start into a far reach to a pinch',4,'black','edge jug pinch volume','overhang',5,'2023-02-12',NULL),(204,0,0,'Cool compression start into a backwards dyno',3,'blue','jug mini-jug volume','overhang',1,'2023-02-12','2023-02-12'),(205,0,0,'Funky start that requires you to face away from the wall and use compression',2,'orange','jug sloper','overhang',1,'2023-02-23','2023-02-23'),(206,0,0,'Cool toe hook start + press up finish',3,'yellow','edge horn','slab',3,'2023-02-23','2023-02-23'),(207,0,0,'Very awkward positions the entire time',3,'blue','edge mini-jug sloper volume','slab',8,'2023-01-19','2023-01-29'),(208,0,0,'Straight muscleup',4,'black','edge volume','slab',3,'2023-01-19','2023-01-29'),(209,0,0,'Fun dyno',3,'black','jug','slab',1,'2023-01-26','2023-01-26'),(210,0,0,'Awkward dyno due to takeoff and landing + hard finish move',4,'blue','jug','slab',10,'2023-01-26','2023-01-12'),(211,0,0,'Far reach to finish\n',2,'green','jug mini-jug','overhang',1,'2023-02-12','2023-02-23'),(212,0,0,'Interesting big holds',3,'green','pinch sloper','slab',2,'2023-02-12','2023-02-12'),(213,0,0,'A few catches to large bowls',3,'black','edge mini-jug','overhang',1,'2023-02-23','2023-02-23'),(214,0,0,'Don\'t know how to do the first move',4,'blue','crimp edge','slab',10,'2023-02-23','2023-03-02'),(215,0,0,'Hard transition to the big bowl sloper',4,'black','jug mini-jug sloper','slab',3,'2023-02-23',NULL),(216,0,0,'warmup',2,'green','jug volume','slab',1,'2023-02-23','2023-02-23'),(217,0,0,'Don\'t know how to do the first move',5,'orange','mini-jug volume','aretes',3,'2023-02-23',NULL),(218,0,0,'warmup',1,'orange','jug','slab',1,'2023-02-25','2023-02-25'),(219,0,0,'warmup',1,'pink','edge jug','overhang',1,'2023-02-25','2023-02-25'),(220,0,0,'easy 2',2,'green','jug','slab',1,'2023-02-04','2023-02-04'),(221,0,0,'Awkward finish position that is hard to keep balance on',3,'black','jug mini-jug sloper volume','slab',4,'2023-02-04','2023-02-04'),(222,0,0,'start position is like Spiderman where you have to inch upwards a bit to the finish',3,'black','sloper volume','aretes',1,'2023-02-04','2023-02-04'),(223,0,0,'Very small feet holds + greasy hand holds makes it difficult. van',4,'blue','crimp edge sloper volume','slab',10,'2023-02-04',NULL),(224,0,0,'Campus burnout',1,'yellow','edge jug','overhang',1,'2023-02-25','2023-02-25'),(225,0,0,'Holds are ok slopers',3,'pink','mini-jug sloper','slab',1,'2023-02-04','2023-02-04'),(226,0,0,'Hard to maintain balance in the finish position due to it being a sloper',4,'purple','side-pull sloper volume','overhang',6,'2023-02-04','2023-02-25'),(227,0,0,'First move is a campus to a crimp. van',5,'green','crimp jug','slab',4,'2023-02-04',NULL),(228,0,0,'Initial dyno is harder to land than it looks',3,'blue','jug pinch pocket','overhang',4,'2023-02-25','2023-02-25'),(229,0,0,'Holds are a lot worse than they look',3,'green','pinch sloper volume','slab',2,'2023-02-25',NULL),(230,0,0,'Very technical climb that requires a lot of precision to stay balanced. Finish is a tough two finger match while doing the splits.',4,'yellow','crimp pinch sloper volume','slab',8,'2023-02-25','2023-02-25'),(231,0,0,'Just a bunch of pinches',3,'blue','pinch volume','overhang',1,'2023-02-25','2023-02-25'),(232,0,0,'Straighforward 3',3,'yellow','edge horn pinch','slab',1,'2023-02-04','2023-02-04'),(233,0,0,'warmup + can be done with no hands',1,'orange','edge','aretes',1,'2023-02-04','2023-02-04'),(234,0,0,'Hard crimpy start',4,'purple','crimp pocket','slab',2,'2023-02-04','2023-02-04'),(235,0,0,'Last move is a bit hard to stick onto the sloper',4,'black','sloper undercling volume','slab',5,'2023-02-04','2023-02-04'),(236,0,0,'Heel hooks during the transition area where you are completely horizontal makes it a bit easier',4,'purple','jug mini-jug','overhang',8,'2023-02-04','2023-02-04'),(237,0,0,'Straightforward 2',2,'orange','edge undercling','overhang',1,'2023-02-25','2023-02-25'),(238,0,0,'Warmup',2,'purple','edge sloper','slab',1,'2023-02-25','2023-02-25'),(265,0,0,'warmup',1,'purple','jug side-pull volume','slab',1,'2023-03-02','2023-03-02'),(266,0,0,'start is a bit tricky, but not too bad otherwise',3,'purple','sloper volume','slab',1,'2023-03-02','2023-03-02'),(267,0,0,'should have used better technique rather than campusing sections',3,'purple','jug mini-jug sloper volume','overhang',1,'2023-03-02','2023-03-02'),(268,0,0,'awkward finish position',2,'blue','jug volume','overhang',1,'2023-02-16','2023-02-16'),(269,0,0,'Smearing the feet + moving quickly made the last catch from crimps easier',4,'blue','crimp jug mini-jug pocket','overhang',10,'2023-03-02','2023-03-23'),(270,0,0,'Permanently in a layback position',3,'yellow','jug side-pull','overhang',1,'2023-03-02','2023-03-02'),(271,0,0,'First move is difficult due to not being able to reach the next volume with the chip on it',4,'yellow','pinch side-pull volume','slab',3,'2023-03-02',NULL),(272,0,0,'Skin killer',4,'black','pinch sloper','overhang',2,'2023-03-02',NULL),(273,0,0,'hard to keep tension during the second move to the crimp',4,'orange','crimp sloper','slab',4,'2023-02-16',NULL),(274,0,0,'Lots of heel hooks + skin killer slopers',4,'orange','crimp sloper volume','overhang',1,'2023-02-16',NULL),(276,0,0,'warmup',1,'blue','jug','slab',1,'2023-03-04','2023-03-04'),(277,0,0,'warmup',1,'yellow','jug','slab',1,'2023-03-04','2023-03-04'),(278,0,0,'interesting gumdrop holds',2,'black','mini-jug','slab',1,'2023-03-04','2023-03-04'),(279,0,0,'Crux move revolves around grabbing both sides of the big sloper',3,'purple','mini-jug sloper','slab',1,'2023-03-04','2023-03-04'),(280,0,0,'the start is very tricky as it requires a high foot + a mantle into a pistol squat. The rest is easy.',3,'blue','edge jug sloper volume','slab',3,'2023-03-04','2023-03-04'),(281,0,0,'Just need to come back fresh to land the dyno to the last hold',4,'yellow','pinch sloper','slab',8,'2023-03-04','2023-03-09'),(282,0,0,'Able to do the finish, but the start dyno is still a WIP.',3,'blue','jug pinch side-pull sloper volume','slab',8,'2023-03-04',NULL),(283,0,0,'Cooldown',1,'green','jug sloper','slab',1,'2023-03-04','2023-03-04'),(284,0,0,'Lots of balance and precise body positioning required',3,'orange','side-pull sloper','slab',1,'2023-03-04','2023-03-04'),(285,0,0,'Knee bar opportunity',3,'purple','edge jug undercling volume','overhang',1,'2023-03-04','2023-03-04'),(286,0,0,'Dyno to the pocket is very hard to stick + subsequent moves are hard',4,'green','crimp jug pocket side-pull volume','overhang',5,'2023-03-04',NULL),(287,0,0,'Step up dyno into a compression, next move is a dyno with bad feet holds',4,'pink','jug pinch','slab',4,'2023-03-04',NULL),(288,0,0,'Can\'t figure out how to move out of the start',4,'yellow','crimp sloper volume','slab',2,'2023-03-04',NULL),(289,0,0,'Toe hook makes the beginning possible, but the ending is still a mystery',4,'yellow','crimp jug','overhang',5,'2023-03-04',NULL),(290,0,0,'Too tired to do at this point',3,'orange','crimp pocket side-pull volume','slab',1,'2023-03-04',NULL),(291,0,0,'Jump start into a compression. Just need to come back another day when I\'m fresh',4,'blue','sloper volume','slab',8,'2023-03-04','2023-03-09'),(292,0,0,'Easy 4',4,'orange','crimp edge volume','slab',1,'2023-03-04','2023-03-04'),(293,0,0,'A 3-mover, where the last move looks like an impossible dyno',4,'orange','crimp volume','overhang',4,'2023-03-04',NULL),(321,0,0,'warmup',1,'yellow','jug','overhang',1,'2023-03-09','2023-03-09'),(322,0,0,'warmup',2,'black','pinch side-pull sloper','slab',1,'2023-03-09','2023-03-09'),(323,0,0,'warmup',2,'black','jug side-pull','slab',1,'2023-03-09','2023-03-09'),(324,0,0,'Really bad feet holds make it hard to keep tension + pull and reach is a bit too far for me',4,'pink','crimp edge volume','slab',6,'2023-03-09',NULL),(325,0,0,'Don\'t know how to progress after the first move, as everything looks too far away',4,'black','jug sloper','overhang',3,'2023-03-09',NULL),(326,0,0,'break climb',2,'pink','mini-jug','slab',1,'2023-03-09','2023-03-09'),(327,0,0,'Hard 3, a lot of the moves look very difficult due to compressions/far reaches',3,'green','edge sloper','slab',2,'2023-03-09',NULL),(328,0,0,'Easy 3',3,'green','mini-jug volume','slab',1,'2023-03-09','2023-03-09'),(329,0,0,'Intended beta is to do it statically, but a dyno made it easier. Most likely a 4.',4,'purple','crimp jug mini-jug pinch','slab',10,'2023-03-09','2023-03-09'),(330,0,0,'Campusing the middle section probably is not the intended beta',4,'black','crimp edge','overhang',2,'2023-03-09','2023-03-09'),(331,0,0,'break climb',1,'yellow','edge mini-jug pocket','slab',1,'2023-03-09','2023-03-09'),(337,0,0,'warmup',1,'yellow','horn jug volume','slab',1,'2023-03-12','2023-03-12'),(338,0,0,'Corner climb done facing out of the wall for fun',2,'purple','edge','slab',1,'2023-03-12','2023-03-12'),(339,0,0,'warmup',1,'green','jug','slab',1,'2023-03-12','2023-03-12'),(340,0,0,'Chill dyno start',3,'red','mini-jug volume','slab',1,'2023-03-12','2023-03-12'),(341,0,0,'Start dyno requires a lot of commitment to send it hard. Top moves all are 2-3 finger pockets',4,'blue','pocket volume','slab',9,'2023-03-12','2023-03-12'),(342,0,0,'Unable to generate enough momentum to reach the next hold after the dyno',4,'yellow','pinch side-pull undercling volume','slab',10,'2023-03-12',NULL),(343,0,0,'A few very powerful catches',3,'blue','jug mini-jug','overhang',6,'2023-03-12','2023-03-19'),(344,0,0,'Interesting climb with 2 big crack like holds',3,'green','crimp side-pull sloper','slab',3,'2023-03-12',NULL),(345,0,0,'holds are really slippery and greasy',3,'yellow','mini-jug side-pull sloper volume','slab',1,'2023-03-12','2023-03-12'),(346,0,0,'Very technical climb that requires high body awareness. Lots of high feet that put the body in uncomfortable positions',4,'red','crimp sloper volume','overhang',8,'2023-03-12',NULL),(347,0,0,'Matching at the top is difficult as the hold is facing the wrong way',3,'yellow','edge sloper volume','overhang',2,'2023-03-12','2023-03-12'),(348,0,0,'Feet holds are non-existent',4,'green','jug mini-jug','overhang',2,'2023-03-12',NULL),(349,0,0,'Have to practice my toe hooks',4,'black','jug pinch','overhang',3,'2023-03-12',NULL),(350,0,0,'crux move is in the middle when you have to swap hands on a bad hold',4,'pink','mini-jug sloper volume','slab',2,'2023-03-12','2023-03-12'),(351,0,0,'Heel hook is the key to making it out of the crux position',3,'blue','edge volume','slab',2,'2023-03-12','2023-03-12'),(355,0,0,'Campused 3 times for burnout',2,'red','jug','overhang',1,'2023-03-12','2023-03-12'),(379,0,0,'A few catch moves on sharp edges make it difficult',3,'red','crimp edge mini-jug','overhang',1,'2023-03-19','2023-03-19'),(380,0,0,'Interesting climb due to the body tension required',3,'blue','side-pull volume','slab',1,'2023-03-19','2023-03-19'),(381,0,0,'All of the moves feel hard, but the holds look ok',4,'black','pinch side-pull','slab',5,'2023-03-19',NULL),(382,0,0,'can be done with and without volumes',2,'black','edge mini-jug volume','overhang',1,'2023-03-19','2023-03-19'),(383,0,0,'Simple dyno.',3,'red','jug sloper','overhang',1,'2023-03-19','2023-03-19'),(384,0,0,'Lots of powerful catch moves to small ledges',4,'green','crimp edge pinch','overhang',4,'2023-03-19','2023-03-19'),(385,0,0,'warmup',1,'green','jug side-pull','slab',1,'2023-03-23','2023-03-23'),(386,0,0,'warmup',1,'blue','jug','slab',1,'2023-03-23','2023-03-23'),(387,0,0,'Cool swing move in the middle',3,'green','jug volume','overhang',1,'2023-03-23','2023-03-23'),(388,0,0,'Lots of compression moves which make the slopers better',4,'purple','mini-jug side-pull sloper volume','slab',2,'2023-03-23','2023-03-23'),(389,0,0,'First move is a dyno to a hemisphere volume',3,'black','jug side-pull volume','slab',2,'2023-03-23','2023-03-23'),(390,0,0,'The entire problem revolves around getting on top of a weird tetrahedron volume thing',3,'orange','volume','slab',2,'2023-03-23','2023-03-23'),(391,0,0,'3 mover. Dyno to the right side of the hold, then reach left, heel hook and pull. cant reach the last hold',4,'blue','edge','slab',10,'2023-03-23',NULL),(392,0,0,'Negative sized hand and feet holds',4,'green','crimp edge pinch sloper volume','slab',4,'2023-03-23',NULL),(393,0,0,'Top is not very elegant, as you have to muscle your way up',3,'yellow','jug mini-jug side-pull volume','slab',2,'2023-03-23','2023-03-30'),(394,0,0,'Too tired to finish',3,'purple','jug undercling volume','slab',1,'2023-03-23',NULL),(395,0,0,'First move feels really hard',4,'pink','edge sloper','slab',1,'2023-03-23',NULL),(396,0,0,'Jump into heel hook, grab both crimps, get left foot up, jump up to the ball and then reach for the finish',4,'blue','crimp edge mini-jug volume','overhang',6,'2023-03-23','2023-03-23'),(400,0,0,'warmup',1,'purple','jug','slab',1,'2023-03-30','2023-03-30'),(401,0,0,'warmup',2,'blue','jug pocket side-pull','slab',1,'2023-03-30','2023-03-30'),(402,0,0,'Hard 1',1,'pink','mini-jug','overhang',1,'2023-03-30','2023-03-30'),(403,0,0,'First move is a dyno to an undercling, the rest is nothing special',3,'black','jug volume','overhang',2,'2023-03-30','2023-03-30'),(404,0,0,'Start is a campus one arm pullup. Key to the last move is to put the right foot into the pocket to push off',4,'blue','crimp jug mini-jug pocket','overhang',10,'2023-03-30','2023-04-11'),(405,0,0,'Although it was a flash, the problem is really long and my send was very ugly',4,'purple','jug mini-jug side-pull volume','overhang',1,'2023-03-30','2023-03-30'),(406,0,0,'Beginning is pretty standard, the top is a bit trickier as it is hard to maneuver around the cone volume',4,'green','crimp jug side-pull volume','overhang',7,'2023-03-30',NULL),(407,0,0,'The start is a bat-hang and the rest is pretty straight-forward',3,'yellow','edge mini-jug','overhang',3,'2023-03-30','2023-04-15'),(408,0,0,'The start is a weird balance start and the top holds are not as good as expected',3,'blue','edge mini-jug pocket','slab',2,'2023-03-30','2023-03-30'),(409,0,0,'All moves are very obvious and not hard given you have enough finger strength',3,'orange','crimp','slab',1,'2023-03-30','2023-03-30'),(410,0,0,'Cool climb with a toe hook start',4,'black','sloper volume','slab',2,'2023-03-30','2023-03-30'),(411,0,0,'Dyno is harder than expected',3,'blue','jug volume','slab',3,'2023-03-30','2023-03-30'),(413,0,0,'Initial dyno is a tough one, but the rest is fairly easy if you don\\\\\\\'t rush',3,'yellow','jug mini-jug volume','slab',5,'2023-03-30','2023-04-04'),(414,0,0,'warmup',1,'purple','jug','slab',1,'2023-04-04','2023-04-04'),(415,0,0,'warmup',2,'black','jug','overhang',1,'2023-04-04','2023-04-04'),(416,0,0,'tough first catch move',3,'pink','edge pinch','overhang',1,'2023-04-04','2023-04-04'),(417,0,0,'very physical boulder with two unique styles, edges then slopers',3,'orange','edge side-pull sloper','overhang',3,'2023-04-04','2023-04-04'),(418,0,0,'smearing the left foot and then placing the right foot feels the easiest',4,'pink','pocket sloper volume','slab',2,'2023-04-04',NULL),(419,0,0,'warmup',1,'orange','edge jug','slab',1,'2023-04-04','2023-04-04'),(420,0,0,'layback is required to make the third move?',-1,'green','edge pinch side-pull','slab',2,'2023-04-04','2023-04-04'),(421,0,0,'last hold is not very good, so matching is hard',3,'pink','crimp edge','aretes',2,'2023-04-04','2023-04-04'),(422,0,0,'can\'t stick the toe hook at the start',4,'yellow','edge horn','aretes',1,'2023-04-04',NULL),(423,0,0,'pinches are skin killers',4,'black','pinch volume','overhang',2,'2023-04-04',NULL),(424,0,0,'Linking moves is the hardest part, as grabbing the pinch is really tiring',4,'pink','edge pinch sloper volume','overhang',7,'2023-04-04','2023-04-15'),(511,0,0,'warmup',1,'black','jug volume','slab',1,'2023-04-06','2023-04-06'),(512,0,0,'warmup',2,'blue','jug undercling volume','overhang',1,'2023-04-06','2023-04-06'),(513,0,0,'sit start + dyno that could be static',3,'black','jug undercling volume','overhang',1,'2023-04-06','2023-04-06'),(514,0,0,'hard compression start + hard transition move into a far dyno',3,'green','mini-jug side-pull sloper','overhang',4,'2023-04-06',NULL),(515,0,0,'Very small crimps, but not very difficult once you have the strength/beta',4,'blue','crimp pocket','slab',7,'2023-04-06','2023-04-06'),(516,0,0,'Easier 4, nothing too complex just have to pull hard on small ledges',4,'pink','crimp edge','slab',2,'2023-04-06','2023-04-06'),(517,0,0,'Unsure how to do the start',4,'orange','sloper volume','slab',2,'2023-04-06',NULL),(518,0,0,'warmup',1,'purple','jug','slab',1,'2023-04-06','2023-04-06'),(519,0,0,'I can do all the moves, just have to link them together',4,'blue','jug mini-jug pinch side-pull sloper','overhang',4,'2023-04-06',NULL),(520,0,0,'Transition out of the overhang is still unknown',4,'green','jug mini-jug pinch side-pull','overhang',4,'2023-04-06',NULL),(521,0,0,'Running dyno start into another catch dyno',4,'black','edge jug side-pull','slab',4,'2023-04-06',NULL),(522,0,0,'Toe hook start is hard to land consistently',3,'green','mini-jug pinch sloper volume','overhang',7,'2023-04-06',NULL),(523,0,0,'Swing dyno is facing the wrong direction + the top is a bit sketchy',4,'yellow','sloper volume','overhang',4,'2023-04-06',NULL),(524,0,0,'straightforward',3,'black','mini-jug','overhang',1,'2023-04-06','2023-04-06'),(525,0,0,'top was harder than expected',3,'blue','crimp edge','overhang',1,'2023-04-06','2023-04-06'),(526,0,0,'trying to make the reach is very difficult as the move is very balancy',4,'pink','pinch side-pull sloper','overhang',6,'2023-04-06',NULL),(527,0,0,'running undercling start, rest is not that hard',3,'blue','mini-jug side-pull sloper undercling volume','slab',1,'2023-04-06','2023-04-06'),(528,0,0,'crimps were small but had enough room for 2 hands',3,'black','crimp volume','slab',1,'2023-04-06','2023-04-06'),(529,0,0,'Couldnt stretch far enough across the gap',4,'pink','pinch','slab',5,'2023-04-06',NULL),(530,0,0,'Just small crimps',3,'green','crimp','slab',3,'2023-04-06','2023-04-06'),(531,0,0,'Many variations on the start make it interesting',3,'pink','edge side-pull volume','slab',1,'2023-04-06','2023-04-06'),(532,0,0,'Too tired at the end of the session',3,'black','edge side-pull','slab',1,'2023-04-06',NULL),(540,0,0,'Lots of fun heel hooks',2,'green','jug pocket','overhang',1,'2023-04-11','2023-04-11'),(541,0,0,'Second move crossover is a really far reach + feet holds are really bad',4,'black','crimp side-pull volume','overhang',3,'2023-04-11',NULL),(542,0,0,'Incline of the wall + far reaches make the moves really difficult',4,'blue','pinch','overhang',2,'2023-04-11',NULL),(543,0,0,'Interesting body position swap in the middle to reposition for the top',3,'blue','mini-jug side-pull','slab',1,'2023-04-11','2023-04-11'),(544,0,0,'Have the start figured out. The middle is still a bit confusing as reaching up to the gaston is hard.',4,'purple','crimp sloper volume','slab',7,'2023-04-11',NULL),(545,0,0,'warmup',1,'blue','jug','slab',1,'2023-04-15','2023-04-15'),(546,0,0,'warmup',2,'black','jug volume','slab',1,'2023-04-15','2023-04-15'),(547,0,0,'Intended beta is to use the wall, but doing a step-up dyno is really close as well',3,'pink','jug','slab',3,'2023-04-15','2023-04-15'),(548,0,0,'first few moves feel good, but the transition move up is a catch onto a sloper',4,'blue','sloper','slab',3,'2023-04-15',NULL),(549,0,0,'The transition out of the cave and into a standing position is a bit tricky',3,'blue','edge jug','overhang',1,'2023-04-15',NULL),(550,0,0,'Incline of the wall makes the crimps really bad',4,'orange','crimp','overhang',1,'2023-04-15',NULL),(551,0,0,'cant hold the start',4,'yellow','horn pinch undercling','overhang',1,'2023-04-15',NULL),(552,0,0,'Intended beta is a crack climb, but not doing it the crack way is much easier',4,'blue','horn pinch side-pull','slab',1,'2023-04-15','2023-04-15'),(553,0,0,'Beta is to do a double catch move while moving to the right',4,'orange','sloper volume','slab',2,'2023-04-15',NULL),(554,0,0,'Pistol squat finish relies on a lot of trust in the feet',4,'black','crimp pinch volume','overhang',4,'2023-04-15','2023-04-15');
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
  `address` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `visits` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gyms`
--

LOCK TABLES `gyms` WRITE;
/*!40000 ALTER TABLE `gyms` DISABLE KEYS */;
INSERT INTO `gyms` VALUES (1,'Hive Surrey','','Surrey',1);
/*!40000 ALTER TABLE `gyms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gymId` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `startTime` date DEFAULT NULL,
  `duration` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gymId_idx` (`gymId`),
  CONSTRAINT `gymId` FOREIGN KEY (`gymId`) REFERENCES `gyms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
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

-- Dump completed on 2023-05-29  3:52:59