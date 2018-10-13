DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45)  NULL,
  price DECIMAL(11,2) NULL,
  stock_quantity INTEGER(11)  NOT NULL,
  product_sales DECIMAL(11,2) NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bike Bell Brass Mini","Outdoors", 7.99, 15), ("Panasonic ErgoFit In-Ear Earbuds","Electronics", 16.25, 10),
 ("APC 6-Outlet Wall Surge Protector","Electronics", 7.21, 13), ("JETech 2-Pack Screen Protector for Samsung Galaxy","Electronics", 5.99, 9),
 ('ASUS VS248H-P 24" Full HD',"Electronics", 131.12, 5), ("Rankie 3-Pack 3ft Micro USB Cable ","Electronics", 3.99, 9),
 ("Brass Presta Valve Adapter","Outdoors", 5.97, 17), ("Pop! Movies: Fantastic Beasts 2","Toys", 15.00, 4),
("Funko Pop Disney: Mickey's 90Th","Toys", 10.00, 6),  ("Funko Pop Animation: Woody Woodpecker","Toys", 10.99, 8);


CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs DECIMAL(11,2) NULL,
PRIMARY KEY (department_id)
);
