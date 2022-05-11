-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: pp_extranet
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities` (
  `activityId` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Autocreated',
  `activityName` varchar(50) NOT NULL COMMENT 'Autocreated',
  `activityDescription` varchar(191) NOT NULL,
  PRIMARY KEY (`activityId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'login','logged in'),(2,'logout','logged out');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activitylog`
--

DROP TABLE IF EXISTS `activitylog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activitylog` (
  `activityLogTimestamp` datetime NOT NULL,
  `activityLogId` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Autocreated',
  `userId` int(10) unsigned NOT NULL,
  `activityId` int(10) unsigned NOT NULL COMMENT 'Autocreated',
  PRIMARY KEY (`activityLogId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitylog`
--

LOCK TABLES `activitylog` WRITE;
/*!40000 ALTER TABLE `activitylog` DISABLE KEYS */;
INSERT INTO `activitylog` VALUES ('2022-04-05 15:50:56',1,1,1),('2022-04-20 19:10:43',2,1,1);
/*!40000 ALTER TABLE `activitylog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `companyId` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Autocreated',
  `companyName` varchar(50) NOT NULL COMMENT 'Autocreated',
  PRIMARY KEY (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'company #1'),(2,'company #2');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deployments`
--

DROP TABLE IF EXISTS `deployments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deployments` (
  `deploymentId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `deploymentCommitDate` datetime NOT NULL,
  `deploymentDate` datetime NOT NULL,
  `deploymentCommitMessage` varchar(765) NOT NULL,
  `deploymentCommitAuthor` varchar(255) DEFAULT NULL,
  `deploymentCommitSha` varchar(256) NOT NULL,
  PRIMARY KEY (`deploymentId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deployments`
--

LOCK TABLES `deployments` WRITE;
/*!40000 ALTER TABLE `deployments` DISABLE KEYS */;
INSERT INTO `deployments` VALUES (2,'2022-03-24 13:31:19','2022-04-05 15:46:42','Initial commit','SanderPaasalu','67dac22'),(3,'2022-04-05 14:42:42','2022-04-05 15:50:42','wip (navbarile vaja saada dropdown paremasse äärde)','Henno Täht','b5eeaee'),(4,'2022-04-05 17:59:56','2022-04-07 14:27:23','Vaja saada firma rippmenüüs valitud firmat kuvama','renar','959263c'),(5,'2022-04-19 20:52:51','2022-04-19 21:08:41','Vaja edasi lisada veel väljasid uue tellimuse lisamise modalisse väljasid','Henno Täht','02a041a'),(6,'2022-04-19 21:09:09','2022-04-20 17:43:49','Updated dependencies','renar','c056e8d');
/*!40000 ALTER TABLE `deployments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `orderBy` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderLocation` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderDate` datetime NOT NULL,
  `orderDateDue` datetime NOT NULL,
  `orderDescription` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderWorkForm` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderWorkGroup` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderWorkType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderWorkAmount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderWorkPrice` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `sessionId` varchar(191) NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`sessionId`),
  KEY `sessions_users_userId_fk` (`userId`),
  CONSTRAINT `sessions_users_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `settingName` varchar(255) NOT NULL,
  `settingValue` varchar(765) DEFAULT NULL,
  PRIMARY KEY (`settingName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('projectVersion','c056e8d'),('translationUpdateLastRun','2022-04-20 17:43:49');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translationlanguages`
--

DROP TABLE IF EXISTS `translationlanguages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translationlanguages` (
  `translationLanguageCode` varchar(255) NOT NULL,
  `translationLanguageName` varchar(255) NOT NULL,
  PRIMARY KEY (`translationLanguageCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translationlanguages`
--

LOCK TABLES `translationlanguages` WRITE;
/*!40000 ALTER TABLE `translationlanguages` DISABLE KEYS */;
INSERT INTO `translationlanguages` VALUES ('af','Afrikaans'),('am','Amharic'),('ar','Arabic'),('az','Azerbaijani'),('be','Belarusian'),('bg','Bulgarian'),('bn','Bengali'),('bs','Bosnian'),('ca','Catalan'),('ceb','Cebuano'),('co','Corsican'),('cs','Czech'),('cy','Welsh'),('da','Danish'),('de','German'),('el','Greek'),('en','English'),('eo','Esperanto'),('es','Spanish'),('et','Estonian'),('eu','Basque'),('fa','Persian'),('fi','Finnish'),('fr','French'),('fy','Frisian'),('ga','Irish'),('gd','Scots Gaelic'),('gl','Galician'),('gu','Gujarati'),('ha','Hausa'),('haw','Hawaiian'),('he','Hebrew'),('hi','Hindi'),('hmn','Hmong'),('hr','Croatian'),('ht','Haitian'),('hu','Hungarian'),('hy','Armenian'),('id','Indonesian'),('ig','Igbo'),('is','Icelandic'),('it','Italian'),('ja','Japanese'),('jv','Javanese'),('ka','Georgian'),('kk','Kazakh'),('km','Khmer'),('kn','Kannada'),('ko','Korean'),('ku','Kurdish'),('ky','Kyrgyz'),('la','Latin'),('lb','Luxembourgish'),('lo','Lao'),('lt','Lithuanian'),('lv','Latvian'),('mg','Malagasy'),('mi','Maori'),('mk','Macedonian'),('ml','Malayalam'),('mn','Mongolian'),('mr','Marathi'),('ms','Malay'),('mt','Maltese'),('my','Myanmar'),('ne','Nepali'),('nl','Dutch'),('no','Norwegian'),('ny','Nyanja (Chichewa)'),('or','Odia (Oriya)'),('pa','Punjabi'),('pl','Polish'),('ps','Pashto'),('pt','Portuguese'),('ro','Romanian'),('ru','Russian'),('rw','Kinyarwanda'),('sd','Sindhi'),('si','Sinhala (Sinhalese)'),('sk','Slovak'),('sl','Slovenian'),('sm','Samoan'),('sn','Shona'),('so','Somali'),('sq','Albanian'),('sr','Serbian'),('st','Sesotho'),('su','Sundanese'),('sv','Swedish'),('sw','Swahili'),('ta','Tamil'),('te','Telugu'),('tg','Tajik'),('th','Thai'),('tk','Turkmen'),('tl','Tagalog (Filipino)'),('tr','Turkish'),('tt','Tatar'),('ug','Uyghur'),('uk','Ukrainian'),('ur','Urdu'),('uz','Uzbek'),('vi','Vietnamese'),('xh','Xhosa'),('yi','Yiddish'),('yo','Yoruba'),('zh','Chinese'),('zu','Zulu');
/*!40000 ALTER TABLE `translationlanguages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translations`
--

DROP TABLE IF EXISTS `translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translations` (
  `translationId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `translationPhrase` varchar(765) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `translationState` varchar(255) NOT NULL DEFAULT 'existsInCode',
  `TranslationSource` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`translationId`),
  UNIQUE KEY `translations_translationPhrase_uindex` (`translationPhrase`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translations`
--

LOCK TABLES `translations` WRITE;
/*!40000 ALTER TABLE `translations` DISABLE KEYS */;
INSERT INTO `translations` VALUES (1,'Invalid username','existsInCode',NULL),(2,'Invalid password','existsInCode',NULL),(3,'User already exists','existsInCode',NULL),(4,'You cannot delete yourself','existsInCode',NULL),(5,'Access denied','existsInCode',NULL),(6,'Wrong username or password','existsInCode',NULL),(7,'Server returned response in an unexpected format','existsInCode',NULL),(8,'Forbidden','existsInCode',NULL),(9,'Server returned an error. Please try again later','existsInCode',NULL),(10,'Module Name','existsInCode',NULL),(11,'Users','existsInCode',NULL),(12,'Logs','existsInCode',NULL),(13,'Halo','existsInCode',NULL),(14,'Translations','existsInCode',NULL),(15,'Please sign in','existsInCode',NULL),(16,'Email','existsInCode',NULL),(17,'Password','existsInCode',NULL),(18,'Sign in','existsInCode',NULL),(19,'Oops...','existsInCode',NULL),(20,'Close','existsInCode',NULL),(21,'Logout','existsInCode',NULL),(22,'Time','existsInCode',NULL),(23,'User','existsInCode',NULL),(24,'Activity','existsInCode',NULL),(25,'Phrase','existsInCode',NULL),(26,'Untranslated','existsInCode',NULL),(27,'Search','existsInCode',NULL),(28,'Languages','existsInCode',NULL),(29,'Select language','existsInCode',NULL),(30,'Google translates < 5000 chars at a time','existsInCode',NULL),(31,'Select language first','existsInCode',NULL),(32,'Are you really sure you want to remove the language %%% and destroy its translations?','existsInCode',NULL),(33,'Add','existsInCode',NULL),(34,'Name','existsInCode',NULL),(35,'Edit user','existsInCode',NULL),(36,'Admin','existsInCode',NULL),(37,'Set to 1 if user must be admin','existsInCode',NULL),(38,'Save changes','existsInCode',NULL),(39,'Are you sure?','existsInCode',NULL),(40,'Company Name','existsInCode',NULL);
/*!40000 ALTER TABLE `translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(191) NOT NULL,
  `userEmail` varchar(191) NOT NULL,
  `userIsAdmin` tinyint(4) NOT NULL DEFAULT 0,
  `userPassword` varchar(191) NOT NULL,
  `userDeleted` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Demo User','demo@example.com',1,'$2y$10$vTje.ndUFKHyuotY99iYkO.2aHJUgOsy2x0RMXP1UmrTe6CQsKbtm',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-11 20:57:23
