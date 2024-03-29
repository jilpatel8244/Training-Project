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
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `hash_password` varchar(50) DEFAULT NULL,
  `salt` varchar(10) DEFAULT NULL,
  `activation_code` varchar(1000) DEFAULT NULL,
  `activation_status` tinyint(1) DEFAULT '0',
  `user_timezone` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'jil','Patel','2024-03-28','patelil8244@gmail.com','male','9979442145','f737878798ecf41ef3c06df0e39d1f14','vrnj','K7Pj19orQoW2',1,'Asia/Calcutta','2024-03-28 14:20:02'),(2,'abhi','Patel','2024-03-01','abhi123@gmail.com','male','1234567891','c0ea0143a144e893259dcb3d0b7ec992','XFge','S20hZJxB8G8A',1,'Asia/Calcutta','2024-03-27 07:05:39'),(3,'tushar','patel','2001-12-13','tushar1@gmail.com','male','1234569874','5bd937196d86c52546bd792cf9ecc6a5','4fMY','hxVRmq2ShFfd',1,'Asia/Calcutta','2024-03-27 07:33:32'),(4,'sanket','lakhani','1996-12-13','sanket@gmail.com','male','7854123698','1fd52c11339ce5fdd9dafdc0ae7f6b0d','uz9X','j7vRbHS4TkMY',1,'Asia/Calcutta','2024-03-27 08:19:28'),(5,'shivam','limbachiya','2002-12-13','shivam12@gamil.com','male','7894561230','f02fd5c429e1eae181508d7da873badd','1mrl','IgFTRlSgAxR1',1,'Asia/Calcutta','2024-03-27 08:28:21'),(6,'divya','patel','1999-12-17','dpatel12@gmail.com','male','9664951894','ce5704448e6915c71bf444859fe000b9','pNYD','tingeDidEGIe',1,'Asia/Calcutta','2024-03-27 10:06:32'),(7,'jil','patel','2024-03-09','pateljeel8fytj44@gmail.com','male','9979442145','0f18bd8502de85539fc0ea162f0f40b8','GtUG','YFXpBbj7C6Ef',1,'Asia/Calcutta','2024-03-27 10:19:12'),(8,'chintan','gor','1975-12-13','chintang123@gmail.com','male','1452369874','c4f0054870e1a20ad20de0d96f450441','NWJ2','FwTUyykrtGpW',1,'Asia/Calcutta','2024-03-28 12:58:56'),(9,'jil','Patel','2024-03-21','patelil4450@gmail.com','male','9979442145',NULL,NULL,'zY70Rh9ZG65F',0,'Asia/Calcutta','2024-03-29 08:04:56'),(10,'jil','Patel','2024-03-21','patelil445@gmail.com','male','9979442145',NULL,NULL,'bAcCC4N69Ou8',0,'Asia/Calcutta','2024-03-29 08:21:57'),(11,'jil','Patel','2024-03-21','patelil45@gmail.com','male','9979442145',NULL,NULL,'nli2sGOiWusk',0,'Asia/Calcutta','2024-03-29 08:23:14'),(12,'jil','Patel','2024-03-21','patelil4@gmail.com','male','9979442145',NULL,NULL,'YMZIOMyJhLIV',0,'Asia/Calcutta','2024-03-29 08:30:09');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-29 15:34:31
