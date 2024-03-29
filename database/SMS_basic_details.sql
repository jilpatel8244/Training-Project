-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: SMS
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

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
-- Table structure for table `basic_details`
--

DROP TABLE IF EXISTS `basic_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basic_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `designation` varchar(20) NOT NULL,
  `gender` varchar(12) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `relationship_status` varchar(12) NOT NULL,
  `city` int DEFAULT NULL,
  `state` int DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `dob` date NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city` (`city`),
  KEY `state` (`state`),
  CONSTRAINT `basic_details_ibfk_1` FOREIGN KEY (`city`) REFERENCES `cities` (`id`),
  CONSTRAINT `basic_details_ibfk_2` FOREIGN KEY (`state`) REFERENCES `states` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_details`
--

LOCK TABLES `basic_details` WRITE;
/*!40000 ALTER TABLE `basic_details` DISABLE KEYS */;
INSERT INTO `basic_details` VALUES (210,'Jil','Patel','Software Engineer','male','D/913 raghuvir symphony','single',147,5,9979442145,395017,'2002-12-13','patelil8244@gmail.com'),(211,'abhishek','verma','Software Engineer','male','G5 gandhinagar','single',133,5,9979442145,395017,'2002-01-13','abhi12@gmail.com'),(212,'divya','Patel','developer','male','rytjhrth','married',29,3,9979442145,398017,'2024-03-28','patelil8244@gmail.com'),(213,'rijvan','limbachiya','developer','male','SEfgawg','married',21,1,9979442145,398017,'2024-03-29','shivam12@gmail.com'),(214,'nisha','patel','Software Engineer','male','aWDD','married',213,34,9979442145,398017,'2024-03-29','pateljeel8fytj44@gmail.com'),(215,'dharm','Patel','Software Engineer','male','amd','married',19,1,1234567896,123456,'1200-02-13','dharmpatel123@gmail.com'),(216,'tej','patel','Software Engineer','male','amijara surat','single',147,5,7894561230,395017,'2002-12-13','krushi123@gmail.com'),(217,'krushi','patel','Software Engineer','male','amijara surat','single',147,5,7894561230,395017,'2002-12-13','krushi123@gmail.com'),(218,'zeeluji','patel','Software Engineer','male','aswergg','married',18,1,9979442145,398017,'1200-02-13','zeelpatel@gmail.com');
/*!40000 ALTER TABLE `basic_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-29 15:34:32
