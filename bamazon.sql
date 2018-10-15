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

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Bike Bell Brass Mini","Outdoors", 7.99, 15,350.55), ("Panasonic ErgoFit In-Ear Earbuds","Electronics", 16.25, 10,130),
 ("APC 6-Outlet Wall Surge Protector","Electronics", 7.21, 13,72.10), ("JETech 2-Pack Screen Protector for Samsung Galaxy","Electronics", 5.99, 9, 1089.85),
 ('ASUS VS248H-P 24" Full HD',"Electronics", 131.12, 5, 1393.36), ("Rankie 3-Pack 3ft Micro USB Cable ","Electronics", 3.99, 9, 19.95),
 ("Brass Presta Valve Adapter","Outdoors", 5.97, 17, 17.91), ("Pop! Movies: Fantastic Beasts 2","Toys", 15.00, 4, 30),
("Funko Pop Disney: Mickey's 90Th","Toys", 10.00, 6, 50.00),  ("Funko Pop Animation: Woody Woodpecker","Toys", 10.99, 8, 540.95);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs DECIMAL(11,2) NULL,
PRIMARY KEY (department_id)
);
INSERT INTO departments (department_name, over_head_costs)
VALUES("Outdoors", 700), ("Electronics", 2000), ("Toys", 600);


SELECT departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) AS product_sales, (sum(products.product_sales)-departments.over_head_costs) AS total_profit
FROM products
INNER JOIN departments ON products.department_name = departments.department_name
GROUP BY departments.department_name
ORDER BY department_id asc;


