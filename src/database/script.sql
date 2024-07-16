CREATE SCHEMA `apic-project` ;

CREATE TABLE `apiculteur` (
      `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `firstname` VARCHAR(150) NOT NULL,
      `lastname` VARCHAR(150) NOT NULL,
      `siret` VARCHAR(150) NOT NULL,
      `napi` VARCHAR(150) NOT NULL,
      `email` VARCHAR(150) NOT NULL UNIQUE,
      `phone` VARCHAR(20) NULL
)Engine = InnoDB;
