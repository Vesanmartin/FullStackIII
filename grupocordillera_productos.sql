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
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `precio_base` decimal(12,2) NOT NULL,
  `unidad` varchar(50) DEFAULT 'unidad',
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'TECH-001','Notebook HP 15','Tecnología',450000.00,'unidad',1,'2026-05-04 03:24:21'),(2,'TECH-002','Monitor Samsung 24','Tecnología',180000.00,'unidad',1,'2026-05-04 03:24:21'),(3,'TECH-003','Teclado Logitech','Tecnología',35000.00,'unidad',1,'2026-05-04 03:24:21'),(4,'TECH-004','Mouse Inalámbrico','Tecnología',25000.00,'unidad',1,'2026-05-04 03:24:21'),(5,'TECH-005','Impresora Epson L3150','Tecnología',120000.00,'unidad',1,'2026-05-04 03:24:21'),(6,'TECH-006','Disco Duro Externo 1TB','Tecnología',65000.00,'unidad',1,'2026-05-04 03:24:21'),(7,'TECH-007','Tablet Samsung A8','Tecnología',280000.00,'unidad',1,'2026-05-04 03:24:21'),(8,'TECH-008','Proyector Epson','Tecnología',350000.00,'unidad',1,'2026-05-04 03:24:21'),(9,'TECH-009','Calculadora Casio','Tecnología',15000.00,'unidad',1,'2026-05-04 03:24:21'),(10,'MOB-001','Silla Ergonómica','Mobiliario',95000.00,'unidad',1,'2026-05-04 03:24:21'),(11,'MOB-002','Escritorio Ejecutivo','Mobiliario',180000.00,'unidad',1,'2026-05-04 03:24:21'),(12,'MOB-003','Archivador 4 Cajones','Mobiliario',75000.00,'unidad',1,'2026-05-04 03:24:21'),(13,'MOB-004','Pizarra Acrílica 120x80','Mobiliario',45000.00,'unidad',1,'2026-05-04 03:24:21'),(14,'PAP-001','Resma Papel A4','Papelería',4500.00,'resma',1,'2026-05-04 03:24:21'),(15,'PAP-002','Carpetas Plastificadas x50','Papelería',8900.00,'caja',1,'2026-05-04 03:24:21'),(16,'PAP-003','Lápices Birome x12','Papelería',3200.00,'caja',1,'2026-05-04 03:24:21'),(17,'PAP-004','Papel Fotográfico A4 x20','Papelería',6800.00,'paquete',1,'2026-05-04 03:24:21'),(18,'PAP-005','Tijeras Oficina','Papelería',2500.00,'unidad',1,'2026-05-04 03:24:21'),(19,'PAP-006','Engrapadora','Papelería',8900.00,'unidad',1,'2026-05-04 03:24:21'),(20,'INS-001','Tóner HP LaserJet','Insumos',45000.00,'unidad',1,'2026-05-04 03:24:21'),(21,'INS-002','Cinta Adhesiva x10','Insumos',5500.00,'pack',1,'2026-05-04 03:24:21'),(22,'INS-003','Limpiador Multiuso','Insumos',3800.00,'litro',1,'2026-05-04 03:24:21'),(23,'ALI-001','Café Granulado 200g','Alimentación',4200.00,'unidad',1,'2026-05-04 03:24:21'),(24,'ALI-002','Agua Mineral x12','Alimentación',6500.00,'pack',1,'2026-05-04 03:24:21'),(25,'ALI-003','Azúcar 1kg','Alimentación',1200.00,'kg',1,'2026-05-04 03:24:21'),(26,'LIC-001','Software Office 365','Licencias',95000.00,'licencia',1,'2026-05-04 03:24:21'),(27,'LIC-002','Antivirus Kaspersky','Licencias',35000.00,'licencia',1,'2026-05-04 03:24:21'),(28,'TEL-001','Teléfono IP Cisco','Telecomunicaciones',85000.00,'unidad',1,'2026-05-04 03:24:21'),(29,'TEL-002','Switch 24 puertos','Telecomunicaciones',120000.00,'unidad',1,'2026-05-04 03:24:21'),(30,'TEL-003','Cable UTP Cat6 x100m','Telecomunicaciones',28000.00,'rollo',1,'2026-05-04 03:24:21');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-09 10:40:23
