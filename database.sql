-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2025 at 12:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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

CREATE TABLE `alumnos` (
  `id_alumno` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `dni` varchar(15) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `direccion` varchar(60) NOT NULL,
  `cp` varchar(5) NOT NULL,
  `localidad` varchar(30) NOT NULL,
  `iban` varchar(35) DEFAULT NULL,
  `fechaInclusion` date NOT NULL,
  `esAdulto` tinyint(1) NOT NULL DEFAULT 1,
  `esAmonestado` tinyint(1) NOT NULL DEFAULT 0,
  `comentariosMedicos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alumnosgrupos`
--

CREATE TABLE `alumnosgrupos` (
  `id_alumnoGrupo` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bonos`
--

CREATE TABLE `bonos` (
  `id_bono` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `cantidadClases` tinyint(4) NOT NULL,
  `esTransferido` tinyint(1) NOT NULL DEFAULT 0,
  `caducidad` date NOT NULL,
  `precioTotal` int(11) NOT NULL COMMENT 'En cts.',
  `fechaPago` datetime NOT NULL,
  `metodoPago` enum('bizum','transferencia','efectivo','otro') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `claesparticulares`
--

CREATE TABLE `claesparticulares` (
  `id_clase` int(11) NOT NULL,
  `id_bono` int(11) NOT NULL,
  `id_profesor` smallint(6) NOT NULL,
  `fechaHora` datetime NOT NULL,
  `duracion` tinyint(4) NOT NULL COMMENT 'En mins.',
  `asignatura` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contactosemergencia`
--

CREATE TABLE `contactosemergencia` (
  `id_contacto` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `alumno` varchar(12) NOT NULL,
  `relacion` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grupos`
--

CREATE TABLE `grupos` (
  `id_grupo` int(11) NOT NULL,
  `id_profesor` smallint(6) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `asignatura` varchar(60) NOT NULL,
  `modalidad` enum('presencial','online','hibrido') NOT NULL,
  `horasSemanales` tinyint(4) NOT NULL COMMENT 'En medias horas.',
  `creacion` date NOT NULL,
  `esActivo` tinyint(1) NOT NULL DEFAULT 1,
  `esIntensivo` tinyint(1) NOT NULL DEFAULT 0,
  `precio` int(11) NOT NULL COMMENT 'En cts,',
  `horarioDias` varchar(30) NOT NULL COMMENT 'Array de días de la semana.',
  `horarioHoras` varchar(50) NOT NULL COMMENT 'Array de horas exactas,',
  `horarioDuraciones` varchar(30) NOT NULL COMMENT 'Array de minutos.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mensualidades`
--

CREATE TABLE `mensualidades` (
  `id_mensualidad` int(11) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `precio` int(11) NOT NULL COMMENT 'En cts.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pagos`
--

CREATE TABLE `pagos` (
  `id_pago` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_mensuallidad` int(11) NOT NULL,
  `fechaPago` datetime NOT NULL,
  `metodoPago` enum('bizum','transferencia','efectivo','otro') NOT NULL,
  `precioTotal` int(11) NOT NULL COMMENT 'En cts.',
  `descuentoCalculado` int(11) DEFAULT NULL COMMENT 'En cts.',
  `descuentoPersonal` int(11) DEFAULT NULL COMMENT 'En cts.',
  `conceptoDescuento` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `precios`
--

CREATE TABLE `precios` (
  `id_precio` int(11) NOT NULL,
  `clave` varchar(10) NOT NULL,
  `valor` int(11) NOT NULL COMMENT 'En cts.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profesores`
--

CREATE TABLE `profesores` (
  `id_profesor` smallint(6) NOT NULL,
  `nombre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relaciones`
--

CREATE TABLE `relaciones` (
  `id_relacion` int(11) NOT NULL,
  `id_alumno1` int(11) NOT NULL,
  `id_alumno2` int(11) NOT NULL,
  `fechaInicio` date NOT NULL,
  `tipoRelacion` enum('familiar','amigo') NOT NULL,
  `esActivo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `responsables`
--

CREATE TABLE `responsables` (
  `id_responsable` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellidos` varchar(60) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `direccion` varchar(80) NOT NULL,
  `cp` varchar(5) NOT NULL,
  `localidad` varchar(40) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `iban` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id_alumno`);

--
-- Indexes for table `alumnosgrupos`
--
ALTER TABLE `alumnosgrupos`
  ADD PRIMARY KEY (`id_alumnoGrupo`),
  ADD KEY `FK_alumno_alumnogrupos` (`id_alumno`),
  ADD KEY `FK_grupo_alumnogrupos` (`id_grupo`);

--
-- Indexes for table `bonos`
--
ALTER TABLE `bonos`
  ADD PRIMARY KEY (`id_bono`),
  ADD KEY `FK_alumno` (`id_alumno`);

--
-- Indexes for table `claesparticulares`
--
ALTER TABLE `claesparticulares`
  ADD PRIMARY KEY (`id_clase`),
  ADD KEY `FK_bono` (`id_bono`),
  ADD KEY `FK_profesor` (`id_profesor`);

--
-- Indexes for table `contactosemergencia`
--
ALTER TABLE `contactosemergencia`
  ADD PRIMARY KEY (`id_contacto`),
  ADD KEY `id_alumno` (`id_alumno`);

--
-- Indexes for table `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`id_grupo`),
  ADD KEY `FK_profesores` (`id_profesor`);

--
-- Indexes for table `mensualidades`
--
ALTER TABLE `mensualidades`
  ADD PRIMARY KEY (`id_mensualidad`),
  ADD KEY `FK_grupo_mensualidades` (`id_grupo`);

--
-- Indexes for table `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `FK_alumno_pagos` (`id_alumno`),
  ADD KEY `FK_mensualidad_pagos` (`id_mensuallidad`);

--
-- Indexes for table `precios`
--
ALTER TABLE `precios`
  ADD PRIMARY KEY (`id_precio`);

--
-- Indexes for table `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id_profesor`);

--
-- Indexes for table `relaciones`
--
ALTER TABLE `relaciones`
  ADD PRIMARY KEY (`id_relacion`),
  ADD KEY `FK_alumno1` (`id_alumno1`),
  ADD KEY `FK_alumno2` (`id_alumno2`);

--
-- Indexes for table `responsables`
--
ALTER TABLE `responsables`
  ADD PRIMARY KEY (`id_responsable`),
  ADD KEY `alumno` (`id_alumno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `alumnosgrupos`
--
ALTER TABLE `alumnosgrupos`
  MODIFY `id_alumnoGrupo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bonos`
--
ALTER TABLE `bonos`
  MODIFY `id_bono` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `claesparticulares`
--
ALTER TABLE `claesparticulares`
  MODIFY `id_clase` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contactosemergencia`
--
ALTER TABLE `contactosemergencia`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grupos`
--
ALTER TABLE `grupos`
  MODIFY `id_grupo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mensualidades`
--
ALTER TABLE `mensualidades`
  MODIFY `id_mensualidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `precios`
--
ALTER TABLE `precios`
  MODIFY `id_precio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id_profesor` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `relaciones`
--
ALTER TABLE `relaciones`
  MODIFY `id_relacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `responsables`
--
ALTER TABLE `responsables`
  MODIFY `id_responsable` int(11) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `claesparticulares`
--
ALTER TABLE `claesparticulares`
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
  ADD CONSTRAINT `FK_mensualidad_pagos` FOREIGN KEY (`id_mensuallidad`) REFERENCES `mensualidades` (`id_mensualidad`);

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
