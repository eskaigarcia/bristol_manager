-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 03, 2025 at 09:09 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bristol_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE IF NOT EXISTS `alumnos` (
  `id_alumno` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dni` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `direccion` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cp` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `localidad` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `iban` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fechaInclusion` date NOT NULL,
  `esAdulto` tinyint(1) NOT NULL DEFAULT '1',
  `esAmonestado` tinyint(1) NOT NULL DEFAULT '0',
  `comentariosMedicos` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `notasRapidas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alumnosgrupos`
--

DROP TABLE IF EXISTS `alumnosgrupos`;
CREATE TABLE IF NOT EXISTS `alumnosgrupos` (
  `id_alumnoGrupo` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `id_grupo` int NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date DEFAULT NULL,
  PRIMARY KEY (`id_alumnoGrupo`),
  KEY `FK_alumno_alumnogrupos` (`id_alumno`),
  KEY `FK_grupo_alumnogrupos` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bonos`
--

DROP TABLE IF EXISTS `bonos`;
CREATE TABLE IF NOT EXISTS `bonos` (
  `id_bono` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `cantidadClases` tinyint NOT NULL,
  `esTransferido` tinyint(1) NOT NULL DEFAULT '0',
  `caducidad` date NOT NULL,
  `precioTotal` int NOT NULL COMMENT 'En cts.',
  `fechaPago` datetime NOT NULL,
  `metodoPago` enum('bizum','transferencia','efectivo','otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_bono`),
  KEY `FK_alumno` (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clasesparticulares`
--

DROP TABLE IF EXISTS `clasesparticulares`;
CREATE TABLE IF NOT EXISTS `clasesparticulares` (
  `id_clase` int NOT NULL AUTO_INCREMENT,
  `id_bono` int NOT NULL,
  `id_profesor` smallint NOT NULL,
  `fechaHora` datetime NOT NULL,
  `modalidad` enum('presencial','online','hibrida') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `duracion` tinyint NOT NULL COMMENT 'En mins.',
  `asignatura` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_clase`),
  KEY `FK_bono` (`id_bono`),
  KEY `FK_profesor` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contactosemergencia`
--

DROP TABLE IF EXISTS `contactosemergencia`;
CREATE TABLE IF NOT EXISTS `contactosemergencia` (
  `id_contacto` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relacion` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_contacto`),
  KEY `id_alumno` (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
CREATE TABLE IF NOT EXISTS `grupos` (
  `id_grupo` int NOT NULL AUTO_INCREMENT,
  `id_profesor` smallint NOT NULL,
  `nombre` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `asignatura` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `modalidad` enum('presencial','online','hibrido') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `horasSemanales` tinyint NOT NULL COMMENT 'En medias horas.',
  `creacion` date NOT NULL,
  `esActivo` tinyint(1) NOT NULL DEFAULT '1',
  `esIntensivo` tinyint(1) NOT NULL DEFAULT '0',
  `precio` int NOT NULL COMMENT 'En cts,',
  `horario` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Objeto JSON con información sobre los días de las clases, las horas de las mismas y sus duraciones. (Puede codificarse y decodificarse con _ex.schedule.encode/decode en library.js)',
  PRIMARY KEY (`id_grupo`),
  KEY `FK_profesores` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `tipoPago` enum('mensualidad','intensivo','bono') COLLATE utf8mb4_general_ci NOT NULL,
  `mesesPagados` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fechaPago` datetime NOT NULL,
  `metodoPago` enum('bizum','transferencia','efectivo','otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `precioTotal` int NOT NULL COMMENT 'En cts.',
  `descuentoCalculado` int DEFAULT NULL COMMENT 'En cts.',
  `descuentoExtra` int DEFAULT NULL COMMENT 'En cts.',
  `conceptoDescuento` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `FK_alumno_pagos` (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
CREATE TABLE IF NOT EXISTS `profesores` (
  `id_profesor` smallint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relaciones`
--

DROP TABLE IF EXISTS `relaciones`;
CREATE TABLE IF NOT EXISTS `relaciones` (
  `id_relacion` int NOT NULL AUTO_INCREMENT,
  `id_alumno1` int NOT NULL,
  `id_alumno2` int NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date DEFAULT NULL,
  `tipoRelacion` enum('familiar','amigo') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_relacion`),
  KEY `FK_alumno1` (`id_alumno1`),
  KEY `FK_alumno2` (`id_alumno2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `responsables`
--

DROP TABLE IF EXISTS `responsables`;
CREATE TABLE IF NOT EXISTS `responsables` (
  `id_responsable` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `nombre` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cp` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `localidad` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `iban` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_responsable`),
  KEY `alumno` (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumnosgrupos`
--
ALTER TABLE `alumnosgrupos`
  ADD CONSTRAINT `FK_alumno_alumnogrupos` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`),
  ADD CONSTRAINT `FK_grupo_alumnogrupos` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`);

--
-- Constraints for table `bonos`
--
ALTER TABLE `bonos`
  ADD CONSTRAINT `FK_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`);

--
-- Constraints for table `clasesparticulares`
--
ALTER TABLE `clasesparticulares`
  ADD CONSTRAINT `FK_bono` FOREIGN KEY (`id_bono`) REFERENCES `bonos` (`id_bono`),
  ADD CONSTRAINT `FK_profesor` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`);

--
-- Constraints for table `contactosemergencia`
--
ALTER TABLE `contactosemergencia`
  ADD CONSTRAINT `id_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`);

--
-- Constraints for table `grupos`
--
ALTER TABLE `grupos`
  ADD CONSTRAINT `FK_profesores` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`);

--
-- Constraints for table `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `FK_alumno_pagos` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`);

--
-- Constraints for table `relaciones`
--
ALTER TABLE `relaciones`
  ADD CONSTRAINT `FK_alumno1` FOREIGN KEY (`id_alumno1`) REFERENCES `alumnos` (`id_alumno`),
  ADD CONSTRAINT `FK_alumno2` FOREIGN KEY (`id_alumno2`) REFERENCES `alumnos` (`id_alumno`);

--
-- Constraints for table `responsables`
--
ALTER TABLE `responsables`
  ADD CONSTRAINT `alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
