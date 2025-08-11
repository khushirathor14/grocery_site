CREATE DATABASE grocery;
use grocery;

CREATE TABLE `Products` (
    `id` smallint(5) UNSIGNED AUTO_INCREMENT,
    `ProductId` varchar(13) NOT NULL,
    `brand_name` varchar(50) DEFAULT 'NO_Brand',
    `product_name` varchar(100) DEFAULT NULL,
    `mrp` decimal(10, 2) DEFAULT NULL,
    `final_price` decimal(10, 2) DEFAULT NULL,
    `Qty` INT NOT NULL DEFAULT 0 COMMENT 'add quntity here',
    `unit` VARCHAR(10) NOT NULL COMMENT 'mg, kg, ml, l, dergon, pair',
    `limits` SMALLINT(2) UNSIGNED NOT NULL DEFAULT 1,
    `category` varchar(50) DEFAULT NULL,
    `stockQuntity` INT NOT NULL DEFAULT 0,
    `status` ENUM('active','inactive') NOT NULL  DEFAULT 'active' ,
    `describes` TEXT,
    PRIMARY KEY (`id`),
    UNIQUE KEY (`ProductId`),
    CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`categoryName`),
    CONSTRAINT `products_ibfk_2` FOREIGN KEY (`unit`) REFERENCES `Units` (`unit_value`)
);


INSERT INTO `Products` VALUES
(1, 'prod_1', 'Amul','Amul Gold Milk',60.00,55.00, 500, 'ml', 3,'Milk_Product', 100, 'active','Full cream milk for daily use.'),
(2, 'prod_2', 'NO_Brand','Fresh Apple',150.00,120.00, 1, 'kg', 2, 'Fruits',100, 'active','High-quality fresh apples from Kashmir.'),
(3, 'prod_3', 'NO_Brand','Organic Potato',40.00,35.00,100, 'g',1, 'Vegitables',100, 'active', 'Fresh organic potatoes directly from farms.'),
(4, 'prod_4', 'MotherDairy','Mother Dairy Butter',250.00,230.00, 100, 'g' , 5, 'Milk_Product',100, 'active','Pure and creamy butter for daily use.'),
(5, 'prod_5', 'Amul','paneer',80.00,80.00, 100, 'g', 3, 'Milk_Product', 100, 'active', 'Pure and creamy butter for daily use.'),
(6, 'prod_6', 'NO_Brand','Banana',60.00,50.00, 12, 'piece', 2, 'Fruits', 100, 'active', 'Fresh and naturally ripened bananas.'),
(7, 'prod_7', "Auml", "Amul Buttor", 60.00, 58.00 , 100, 'g', 3, 'Milk_Product', 2, 'active', "fresh Amul Butter for tasty Breds, and daal makni etc.");

CREATE TABLE `category` (
  `id` smallint(6) NOT NULL COMMENT 'index',
  `categoryName` varchar(30) NOT NULL COMMENT 'Category Name',
  `images` varchar(50) DEFAULT NULL COMMENT 'Thumbnail Image for catogroy',
  `color` varchar(25) DEFAULT NULL COMMENT 'Row color for cotagory row',
  `altText` varchar(20) NOT NULL DEFAULT 'catagory Image' COMMENT 'alternet text for img tag',
  UNIQUE KEY (`categoryName`)
)  COMMENT 'This Table is contains Product Category name, their thumb image, and color for row';


INSERT INTO `category` (`id`, `categoryName`, `images`, `color`, `altText`) VALUES
(1, 'Fruits', 'FruitThumbnail.png', 'rgb(255, 166, 0)', 'Fruit Catagory'),
(2, 'Vegitables', 'VegetablesThumbnail.png', 'rgb(34, 238, 34)', 'Vegetables Catagory'),
(3, 'Milk_Product', 'MilkProductThumbnail.png', 'rgb(255, 239, 196)', 'MilkProduct Catagory');


CREATE TABLE ProductImages (
	id SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT "index",
	ProductId VARCHAR(13) NOT NULL UNIQUE ,
	ThumImage VARCHAR(50) NOT NULL DEFAULT "img/notFound.svg" COMMENT "Thumbnail Image",
	mainImage VARCHAR(50) NOT NULL COMMENT "main Image for ",
	OthImage VARCHAR(255) COMMENT "all other Images",
	FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
) COMMENT 'this store all image of products';

INSERT INTO ProductImages (ProductId, ThumImage, mainImage, OthImage) VALUES
('prod_1', 'anuml500ml.jpg', 'anuml500ml.jpg', 'amul500ml_back.jpg, amul500ml_Discription.jpg'),
('prod_2', 'apple.jpg', 'apple.jpg', 'apple.jpg, apple.jpg'),
('prod_3', 'pineapple.jpg', 'pineapple.jpg', 'pineapple.jpg, pineapple.jpg'),
('prod_4', 'strobary.jpg', 'strobary.jpg', 'strobary.jpg, strobary.jpg'),
('prod_5', 'orange.jpg', 'orange.jpg', 'orange.jpg, orange.jpg'),
('prod_6', 'banana.jpg', 'banana.jpg', 'banana.jpg, banana.jpg'),
('prod_7', "amulButtor.jpg", "amulButtor.jpg", "amulButtor.jpg, amulButtorBack.jpg");

CREATE VIEW ProductWithImages AS
SELECT 
  p.ProductId,
  p.brand_name,
  p.product_name,
  p.mrp,
  p.final_price,
  p.Qty,
  p.unit,
  p.limits,
  p.category,
  c.color AS categoryColor,
  pi.ThumImage,
  pi.mainImage,
  pi.OthImage,
  p.describes
FROM Products p
INNER JOIN ProductImages pi ON p.ProductId = pi.ProductId
INNER JOIN category c ON p.category = c.categoryName;

CREATE VIEW ShortProductInfo AS
SELECT
  p.`ProductId`,
  p.product_name,
  p.brand_name,
  p.mrp,
  p.final_price,
  p.Qty,
  p.unit,
  p.limits,
  c.color AS categoryColor,
  pi.ThumImage
  FROM Products p 
  INNER JOIN ProductImages pi ON p.ProductId = pi.ProductId
  INNER JOIN category c ON p.category = c.categoryName;

-- SELECT * FROM ShortProductInfo WHERE ProductId = 'prod_1';

CREATE TABLE Units (
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    unit_value VARCHAR(10) NOT NULL UNIQUE COMMENT "-- e.g., mg, g, kg",      
    unit_label VARCHAR(50) NOT NULL COMMENT " -- e.g., Mili Gram",            
    unit_type VARCHAR(20) NOT NULL COMMENT " -- e.g., Gram, Liquid, Number"
);

-- Gram Units
INSERT INTO Units (unit_value, unit_label, unit_type) VALUES 
('mg', 'Mili Gram', 'Gram'),
('g', 'Gram', 'Gram'),
('kg', 'Kilo Gram', 'Gram');

-- Liquid Units
INSERT INTO Units (unit_value, unit_label, unit_type) VALUES 
('mL', 'Mili Liter', 'Liquid'),
('L', 'Liter', 'Liquid');

-- Number Units
INSERT INTO Units (unit_value, unit_label, unit_type) VALUES 
('darjan', 'Darjan', 'Number'),
('pair', 'Pair', 'Number'),
('unit', 'Number', 'Number'),
("piece", "piece", "unit" );



CREATE TABLE IF NOT EXISTS addresses(
  id SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  addrId VARCHAR(10) NOT NULL UNIQUE ,
  houseNum SMALLINT UNSIGNED NOT NULL DEFAULT '102',
  blocks VARCHAR(5) DEFAULT 'B',
  city VARCHAR(20) NOT NULL DEFAULT 'jahangirpuri',
  stateName VARCHAR(20) NOT NULL DEFAULT 'delhi',
  zip_code varchar(8) NOT NULL DEFAULT '110033'
);
INSERT INTO addresses (addrId) VALUES('addr_1');


CREATE TABLE naam (
  id SMALLINT UNSIGNED UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT,
  naamId VARCHAR(10) NOT NULL UNIQUE COMMENT 'naamId',
  FirstName VARCHAR(10) NOT NULL COMMENT 'first name',
  MidName VARCHAR(10) DEFAULT '',
  LastName VARCHAR(15) DEFAULT ''
);
INSERT INTO naam (naamId, `FirstName`, `LastName`) VALUES 
('naam_1', 'neha', 'khan');


CREATE TABLE IF NOT EXISTS users(
   id SMALLINT UNSIGNED UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT,
   usrId VARCHAR(10) NOT NULL UNIQUE COMMENT 'usrId',
   naamId VARCHAR(10) NOT NULL UNIQUE COMMENT 'naamId',
   Email VARCHAR(50),
   phoneNumber VARCHAR(10) NOT NULL DEFAULT '9891000000',
   addrId VARCHAR(10) NOT NULL UNIQUE ,
   CONSTRAINT `addrid_fk_u` FOREIGN KEY (addrId) REFERENCES addresses(addrId)
);
INSERT INTO users (`usrId`, `naamId`, `Email`, `addrId`) VALUES
('usr_1', 'naam_1', 'nehaKhan@gmail.com', 'addr_1');

CREATE TABLE IF NOT EXISTS user_role(
  id SMALLINT UNSIGNED UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT,
  usrId VARCHAR(10) NOT NULL UNIQUE COMMENT 'usrId',
  role_name ENUM('admin', 'costomer') NOT NULL DEFAULT 'costomer',
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pwd varchar(13) NOT NULL DEFAULT '0000',
  status ENUM('active', 'inactive') DEFAULT 'inactive',
  CONSTRAINT `usrId_Fk_ul` FOREIGN KEY (usrId) REFERENCES users(`usrId`)
);
INSERT INTO user_role (`usrId`, role_name, status) VALUES
('usr_1', 'admin', 'active');


