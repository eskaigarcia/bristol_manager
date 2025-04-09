-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 09, 2025 at 07:25 AM
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
-- Database: `bristol_alumnos`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE IF NOT EXISTS `alumnos` (
  `id_alumno` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dni` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `direccion` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cp` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `localidad` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `iban` varchar(35) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fechaInclusion` date NOT NULL,
  `esAdulto` tinyint(1) NOT NULL DEFAULT '1',
  `esAmonestado` tinyint(1) NOT NULL DEFAULT '0',
  `comentariosMedicos` text COLLATE utf8mb4_general_ci,
  `notasRapidas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `nombre`, `apellidos`, `telefono`, `dni`, `email`, `direccion`, `cp`, `localidad`, `iban`, `fechaInclusion`, `esAdulto`, `esAmonestado`, `comentariosMedicos`, `notasRapidas`) VALUES
(1, 'Eskai', 'García Alcántara', '645645645', '12345678E', NULL, NULL, NULL, NULL, NULL, '2025-03-26', 1, 0, NULL, ''),
(2, 'Daniel', 'Corrales Garnica', NULL, '676243', 'gmadksl@gmail.com', NULL, NULL, NULL, NULL, '0000-00-00', 0, 0, NULL, ''),
(5, 'Cristina', 'Gálvez Alumnia', '2345', '3462346', 'rgtewgfdvsdfgs', NULL, NULL, NULL, NULL, '0000-00-00', 1, 1, NULL, ''),
(6, 'Juan', 'González Domínguez', '4567543', NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', 0, 0, 'Alérgico a las nueces', ''),
(7, 'Cristina', 'Gálvez Alumnia', '2345', '3462346', 'rgtewgfdvsdfgs', NULL, NULL, NULL, NULL, '0000-00-00', 1, 1, NULL, ''),
(8, 'Eskai', 'García Alcántara', '645645645', '12345678E', NULL, NULL, NULL, NULL, '847ftfcf75e5s76y8', '2025-03-26', 1, 0, NULL, ''),
(9, 'Jorge', 'González', '644123456', '', '', '', '', '', '848492736519', '0000-00-00', 1, 0, '', ''),
(10, 'Alumno', 'real real', '600123506', '64579283J', 'emailverdadero@gmail.com', 'C/Jáudenes nº4 7ºB', '18002', 'Granada, España', 'ES546785098723456784', '2025-04-07', 1, 0, NULL, ''),
(11, 'Persona', '', 'NULL', '', 'NULL', '', '', '', 'NULL', '0000-00-00', 0, 0, 'NULL', '');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumnosgrupos`
--

INSERT INTO `alumnosgrupos` (`id_alumnoGrupo`, `id_alumno`, `id_grupo`, `fechaInicio`, `fechaFin`) VALUES
(1, 2, 1, '2025-04-04', NULL),
(2, 2, 2, '2025-04-01', NULL);

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
  `metodoPago` enum('bizum','transferencia','efectivo','otro') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_bono`),
  KEY `FK_alumno` (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bonos`
--

INSERT INTO `bonos` (`id_bono`, `id_alumno`, `cantidadClases`, `esTransferido`, `caducidad`, `precioTotal`, `fechaPago`, `metodoPago`) VALUES
(1, 2, 5, 0, '2025-07-31', 9000, '2025-04-07 16:08:08', 'efectivo');

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
  `duracion` tinyint NOT NULL COMMENT 'En mins.',
  `asignatura` varchar(40) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_clase`),
  KEY `FK_bono` (`id_bono`),
  KEY `FK_profesor` (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clasesparticulares`
--

INSERT INTO `clasesparticulares` (`id_clase`, `id_bono`, `id_profesor`, `fechaHora`, `duracion`, `asignatura`) VALUES
(1, 1, 1, '2025-04-07 16:08:54', 40, 'Matemáticas'),
(2, 1, 1, '2025-04-09 18:09:33', 100, 'matematicas');

-- --------------------------------------------------------

--
-- Table structure for table `contactosemergencia`
--

DROP TABLE IF EXISTS `contactosemergencia`;
CREATE TABLE IF NOT EXISTS `contactosemergencia` (
  `id_contacto` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `nombre` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relacion` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_contacto`),
  KEY `id_alumno` (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactosemergencia`
--

INSERT INTO `contactosemergencia` (`id_contacto`, `id_alumno`, `nombre`, `telefono`, `relacion`) VALUES
(1, 2, 'Paco', '95843949', 'Compañero de piso'),
(2, 2, 'Lucia', '693044203', 'Hermana'),
(3, 2, 'Jaime Ramirez', '492049350', 'Padre');

-- --------------------------------------------------------

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
CREATE TABLE IF NOT EXISTS `grupos` (
  `id_grupo` int NOT NULL AUTO_INCREMENT,
  `id_profesor` smallint NOT NULL,
  `nombre` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `asignatura` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `modalidad` enum('presencial','online','hibrido') COLLATE utf8mb4_general_ci NOT NULL,
  `horasSemanales` tinyint NOT NULL COMMENT 'En medias horas.',
  `creacion` date NOT NULL,
  `esActivo` tinyint(1) NOT NULL DEFAULT '1',
  `esIntensivo` tinyint(1) NOT NULL DEFAULT '0',
  `precio` int NOT NULL COMMENT 'En cts,',
  `horario` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Objeto JSON con información sobre los días de las clases, las horas de las mismas y sus duraciones. (Puede codificarse y decodificarse con _ex.schedule.encode/decode en library.js)',
  PRIMARY KEY (`id_grupo`),
  KEY `FK_profesores` (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grupos`
--

INSERT INTO `grupos` (`id_grupo`, `id_profesor`, `nombre`, `asignatura`, `modalidad`, `horasSemanales`, `creacion`, `esActivo`, `esIntensivo`, `precio`, `horario`) VALUES
(1, 1, 'Intensivo Inglés Martes', 'ingles', 'online', 3, '2025-04-07', 1, 0, 70, ''),
(2, 1, 'Frances Tardes Jueves', NULL, 'online', 2, '2025-04-07', 1, 0, 65, '');

-- --------------------------------------------------------

--
-- Table structure for table `mensualidades`
--

DROP TABLE IF EXISTS `mensualidades`;
CREATE TABLE IF NOT EXISTS `mensualidades` (
  `id_mensualidad` int NOT NULL AUTO_INCREMENT,
  `id_grupo` int NOT NULL,
  `fecha` date NOT NULL,
  `precio` int NOT NULL COMMENT 'En cts.',
  PRIMARY KEY (`id_mensualidad`),
  KEY `FK_grupo_mensualidades` (`id_grupo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mensualidades`
--

INSERT INTO `mensualidades` (`id_mensualidad`, `id_grupo`, `fecha`, `precio`) VALUES
(1, 2, '2025-04-01', 65);

-- --------------------------------------------------------

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `id_mensualidad` int NOT NULL,
  `fechaPago` datetime NOT NULL,
  `metodoPago` enum('bizum','transferencia','efectivo','otro') COLLATE utf8mb4_general_ci NOT NULL,
  `precioTotal` int NOT NULL COMMENT 'En cts.',
  `descuentoCalculado` int DEFAULT NULL COMMENT 'En cts.',
  `descuentoPersonal` int DEFAULT NULL COMMENT 'En cts.',
  `conceptoDescuento` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `FK_alumno_pagos` (`id_alumno`),
  KEY `FK_mensualidad_pagos` (`id_mensualidad`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pagos`
--

INSERT INTO `pagos` (`id_pago`, `id_alumno`, `id_mensualidad`, `fechaPago`, `metodoPago`, `precioTotal`, `descuentoCalculado`, `descuentoPersonal`, `conceptoDescuento`) VALUES
(1, 2, 1, '2025-04-07 14:48:35', 'efectivo', 95, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
CREATE TABLE IF NOT EXISTS `profesores` (
  `id_profesor` smallint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profesores`
--

INSERT INTO `profesores` (`id_profesor`, `nombre`) VALUES
(1, 'Daniel Profesor');

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
  `tipoRelacion` enum('familiar','amigo') COLLATE utf8mb4_general_ci NOT NULL,
  `esActivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_relacion`),
  KEY `FK_alumno1` (`id_alumno1`),
  KEY `FK_alumno2` (`id_alumno2`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relaciones`
--

INSERT INTO `relaciones` (`id_relacion`, `id_alumno1`, `id_alumno2`, `fechaInicio`, `tipoRelacion`, `esActivo`) VALUES
(1, 2, 1, '2025-04-02', 'amigo', 1),
(2, 5, 2, '2025-04-03', 'familiar', 1);

-- --------------------------------------------------------

--
-- Table structure for table `responsables`
--

DROP TABLE IF EXISTS `responsables`;
CREATE TABLE IF NOT EXISTS `responsables` (
  `id_responsable` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `nombre` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `cp` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  `localidad` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `iban` varchar(35) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_responsable`),
  KEY `alumno` (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `responsables`
--

INSERT INTO `responsables` (`id_responsable`, `id_alumno`, `nombre`, `apellidos`, `dni`, `direccion`, `cp`, `localidad`, `email`, `telefono`, `iban`) VALUES
(1, 2, 'Padre de Daniel', 'Corrales Otro', '12345678O', 'Calle de un peublo raro', '12395', 'Cordoba', 'kasjdnfasdf@email.com', '987654321', NULL);

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
-- Constraints for table `mensualidades`
--
ALTER TABLE `mensualidades`
  ADD CONSTRAINT `FK_grupo_mensualidades` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`);

--
-- Constraints for table `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `FK_alumno_pagos` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`),
  ADD CONSTRAINT `FK_mensualidad_pagos` FOREIGN KEY (`id_mensualidad`) REFERENCES `mensualidades` (`id_mensualidad`);

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
