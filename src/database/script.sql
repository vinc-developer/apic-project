CREATE SCHEMA `apic-project` ;

CREATE TABLE `address` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `street` VARCHAR(150) NOT NULL,
    `additional_address` VARCHAR(150) NULL,
    `zipcode` VARCHAR(150) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `state` VARCHAR(150) NULL,
    `country` VARCHAR(150) NULL
)Engine = InnoDB;

CREATE TABLE `beekeeper` (
      `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `firstname` VARCHAR(150) NOT NULL,
      `lastname` VARCHAR(150) NOT NULL,
      `siret` VARCHAR(150),
      `napi` VARCHAR(150) NOT NULL,
      `email` VARCHAR(150) NOT NULL UNIQUE,
      `phone` VARCHAR(20) NULL,
      `filename` VARCHAR(250) NOT NULL DEFAULT 'no_picture.png',
      `id_address` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `beekeeper` ADD CONSTRAINT `fk_beekeeper_address` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `beeyard` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `environment` VARCHAR(150) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `id_beekeeper` INT NOT NULL,
    `id_address` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `beeyard` ADD CONSTRAINT `fk_beeyard_address` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `beeyard` ADD CONSTRAINT `fk_beeyard_beekeeper` FOREIGN KEY (`id_beekeeper`) REFERENCES `beekeeper`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `beehive` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `bee_type` VARCHAR(150) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `type_hive` VARCHAR(150) NOT NULL,
    `id_beeyard` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `beehive` ADD CONSTRAINT `fk_beehive_beeyard` FOREIGN KEY (`id_beeyard`) REFERENCES `beeyard`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `honeycrop` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `honey_kg` BIGINT NOT NULL,
    `nb_hausses` BIGINT NOT NULL,
    `id_beehive` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `honeycrop` ADD CONSTRAINT `fk_honeycrop_beehive` FOREIGN KEY (`id_beehive`) REFERENCES `beehive`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `harvesthoney` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date_harvest` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `total_honey_kg` BIGINT NOT NULL,
    `total_sale_honey_kg` BIGINT NULL,
    `lot_number` BIGINT NOT NULL,
    `storage` VARCHAR(150) NOT NULL
)Engine = InnoDB;

CREATE TABLE `rel_harvesthoney_honeycrop`(
    `id_honeycrop` INT NOT NULL,
    `id_harvesthoney` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `rel_harvesthoney_honeycrop` ADD PRIMARY KEY (`id_honeycrop`,`id_harvesthoney`);
ALTER TABLE `rel_harvesthoney_honeycrop` ADD CONSTRAINT `fk_honeycrop_harvesthoney` FOREIGN KEY (`id_honeycrop`) REFERENCES `honeycrop`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `rel_harvesthoney_honeycrop` ADD CONSTRAINT `fk_harvesthoney_honeycrop` FOREIGN KEY (`id_harvesthoney`) REFERENCES `harvesthoney`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `product` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `type` ENUM('POT', 'SACHET') NOT NULL DEFAULT 'POT',
    `weight` BIGINT NOT NULL,
    `quantity` BIGINT NOT NULL,
    `quantity_sale` BIGINT NULL,
    `lot_number` BIGINT NOT NULL,
    `DLUO` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `date_packaging` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `id_harvesthoney` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `product` ADD CONSTRAINT `fk_product_harvesthoney` FOREIGN KEY (`id_harvesthoney`) REFERENCES `harvesthoney`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `client` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstname` VARCHAR(150) NOT NULL,
    `lastname` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `phone` VARCHAR(20) NULL,
    `id_address` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `client` ADD CONSTRAINT `fk_client_address` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `order` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `order_number` VARCHAR(150) NOT NULL,
    `total_price` DOUBLE NOT NULL,
    `order_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('En Attente', 'Validé', 'En cours', 'Terminé', 'Annulé', 'Echec') NOT NULL DEFAULT 'En Attente',
    `id_client` INT NOT NULL
 )Engine = InnoDB;

ALTER TABLE `order` ADD CONSTRAINT `fk_client_order` FOREIGN KEY (`id_client`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `order_product` (
    `id_order` INT NOT NULL,
    `id_product` INT NOT NULL,
    `quantity` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `order_product` ADD PRIMARY KEY (`id_order`,`id_product`);
ALTER TABLE `order_product` ADD CONSTRAINT `fk_order_product` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `order_product` ADD CONSTRAINT `fk_product_order` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `payment` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `payment_description` VARCHAR(150) NOT NULL,
    `payment_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('En Attente', 'Payé', 'Echec') NOT NULL DEFAULT 'En Attente',
    `id_order` INT NOT NULL
)Engine = InnoDB;

ALTER TABLE `payment` ADD CONSTRAINT `fk_payment_order` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
