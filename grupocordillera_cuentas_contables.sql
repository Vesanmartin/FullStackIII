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
-- Table structure for table `cuentas_contables`
--

DROP TABLE IF EXISTS `cuentas_contables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuentas_contables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` enum('ingreso','gasto','activo','pasivo') NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentas_contables`
--

LOCK TABLES `cuentas_contables` WRITE;
/*!40000 ALTER TABLE `cuentas_contables` DISABLE KEYS */;
INSERT INTO `cuentas_contables` VALUES (1,'4101001','Ventas Tecnología','ingreso','Ventas','2026-05-04 03:24:21'),(2,'4101002','Ventas Mobiliario','ingreso','Ventas','2026-05-04 03:24:21'),(3,'4101003','Ventas Papelería e Insumos','ingreso','Ventas','2026-05-04 03:24:21'),(4,'4101004','Ventas Licencias Software','ingreso','Ventas','2026-05-04 03:24:21'),(5,'4101005','Ventas Telecomunicaciones','ingreso','Ventas','2026-05-04 03:24:21'),(6,'4101006','Ventas Alimentación','ingreso','Ventas','2026-05-04 03:24:21'),(7,'5101001','Compras Tecnología','gasto','Compras','2026-05-04 03:24:21'),(8,'5101002','Compras Mobiliario','gasto','Compras','2026-05-04 03:24:21'),(9,'5101003','Compras Papelería e Insumos','gasto','Compras','2026-05-04 03:24:21'),(10,'5101004','Compras Licencias Software','gasto','Compras','2026-05-04 03:24:21'),(11,'5101005','Compras Telecomunicaciones','gasto','Compras','2026-05-04 03:24:21'),(12,'5101006','Compras Alimentación','gasto','Compras','2026-05-04 03:24:21'),(13,'1301001','Inventario Tecnología','activo','Inventario','2026-05-04 03:25:39'),(14,'1301002','Inventario Mobiliario','activo','Inventario','2026-05-04 03:25:39'),(15,'1301003','Inventario Papelería e Insumos','activo','Inventario','2026-05-04 03:25:39'),(16,'1301004','Inventario Licencias Software','activo','Inventario','2026-05-04 03:25:39'),(17,'1301005','Inventario Telecomunicaciones','activo','Inventario','2026-05-04 03:25:39'),(18,'1301006','Inventario Alimentación','activo','Inventario','2026-05-04 03:25:39');
/*!40000 ALTER TABLE `cuentas_contables` ENABLE KEYS */;
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
