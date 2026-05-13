CREATE DATABASE  IF NOT EXISTS `grupocordillera` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `grupocordillera`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: grupocordillera
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `terceros`
--

DROP TABLE IF EXISTS `terceros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terceros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rut` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` enum('cliente','proveedor','ambos') NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rut` (`rut`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terceros`
--

LOCK TABLES `terceros` WRITE;
/*!40000 ALTER TABLE `terceros` DISABLE KEYS */;
INSERT INTO `terceros` VALUES (1,'76123456-7','Empresa ABC Ltda.','cliente',NULL,NULL,'Santiago',1,'2026-05-04 03:24:21'),(2,'76234567-8','Comercial Norte S.A.','cliente',NULL,NULL,'Antofagasta',1,'2026-05-04 03:24:21'),(3,'76345678-9','Inversiones Sur Ltda.','cliente',NULL,NULL,'Concepción',1,'2026-05-04 03:24:21'),(4,'76456789-0','Tech Solutions SpA','cliente',NULL,NULL,'Santiago',1,'2026-05-04 03:24:21'),(5,'76567890-1','Distribuidora Central','cliente',NULL,NULL,'Valparaíso',1,'2026-05-04 03:24:21'),(6,'76678901-2','Servicios Integrales S.A.','cliente',NULL,NULL,'Santiago',1,'2026-05-04 03:24:21'),(7,'76789012-3','Constructora Andina','cliente',NULL,NULL,'Santiago',1,'2026-05-04 03:24:21'),(8,'76890123-4','Retail Express Ltda.','cliente',NULL,NULL,'Concepción',1,'2026-05-04 03:24:21'),(9,'76901234-5','Logística Pacífico SpA','cliente',NULL,NULL,'Valparaíso',1,'2026-05-04 03:24:21'),(10,'77012345-6','Consultora Digital S.A.','cliente',NULL,NULL,'Santiago',1,'2026-05-04 03:24:21'),(11,'88123456-7','Proveedor Tech S.A.','proveedor',NULL,NULL,'Santiago',1,'2026-05-04 03:24:21'),(12,'88234567-8','Distribuidora Office Ltda.','proveedor',NULL,NULL,'Santiago',1,'2026-05-04 03:24:21'),(13,'88345678-9','Importadora Global SpA','proveedor',NULL,NULL,'Valparaíso',1,'2026-05-04 03:24:21'),(14,'88456789-0','Mayorista Sur S.A.','proveedor',NULL,NULL,'Concepción',1,'2026-05-04 03:24:21'),(15,'88567890-1','Suministros Pacífico','proveedor',NULL,NULL,'Antofagasta',1,'2026-05-04 03:24:21');
/*!40000 ALTER TABLE `terceros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-09 10:40:22
