var mysql = require("mysql");
var inquirer = require("inquirer")

var dataB = []
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    ask()
});
function ask() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "Menu",
                message: "Menu",
                choices: [
                    "* View Pruducts for Sale",
                    "* View Low Inventory",
                    "* Add to Inventory",
                    "* Add New Product",
                    "* End"
                ]
            }])

        .then(function (answers) {
            switch (answers.Menu) {
                case "* View Pruducts for Sale":
                    view();
                    break;
                case "* View Low Inventory":
                    low();
                    break;
                case "* Add to Inventory":
                    quan();
                    break;
                case "* Add New Product":
                    newt()
                    break;
                case "* End":
                    end()
                    break;
            }
        })
}
function view() {

    var query = connection.query("SELECT * FROM products ", function (err, res) {
        console.log("\r\n")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity);


        }
        console.log("\r\n")
        ask()
    });
}
function low() {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        console.log("\r\n")
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5)
                console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("\r\n")
        ask()
    })
}

function quan(){
    var query = connection.query("SELECT * FROM products ", function (err, res) {
        console.log("\r\n")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("\r\n")
        inquirer
        .prompt([
            {
                name: "product",
                message: "Please enter the number of the product:  ",
                validate: function (value) {
                    if ((value) !== NaN) {
                        return true;
                    }
                    return false;
                }
            },
            {

                name: "qu",
                message: "Please enter the quantity to add: ",
                validate: function (value) {
                    if ((value) !== NaN) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answers) {
            console.log(parseInt(answers.qu), parseInt(res[answers.product-1].stock_quantity))
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: parseInt(answers.qu)+parseInt(res[answers.product-1].stock_quantity)
                  },
                  {
                    item_id: answers.product
                  }
                ],
                function(err, res) {
                  console.log(res.affectedRows + " products updated!\n");
                  ask()
                })       
        })
    })
}



function newt() {
    inquirer
        .prompt([
            {
                name: "product",
                message: "Please enter the name of the product: ",
              
            },
            {

                name: "department",
                message: "Please enter the department this product is in: ",
            },
            {

                name: "price",
                message: "Please enter the products price: ",
                validate: function (value) {
                    if ((value) !== NaN) {
                        return true;
                    }
                    return false;
                }

            },
            {

                name: "quant",
                message: "Please enter the quantity of this product in stock: ",
                validate: function (value) {
                    if ((value) !== NaN) {
                        return true;
                    }
                    return false;
                }
            }

        ])
        .then(function (answers) {

            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answers.product,
                    department_name: answers.department,
                    price: answers.price,
                    stock_quantity: answers.quant
                },
                function (err, res) {
                    //console.log(res.affectedRows + " product inserted!\n");
                    ask()
                }
            );

            // logs the actual query being run
            console.log(query.sql);
        })
    }


















function end() {
                connection.end()
            }
