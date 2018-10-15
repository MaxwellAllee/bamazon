var mysql = require("mysql");
var inquirer = require("inquirer")
var Table = require('cli-table')

var rest = []
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
    if (err) throw err});
ask()
function ask() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "Menu",
                message: "Menu",
                choices: [
                    "* View Product Sales by Department",
                    "* Create New Department",
                    "* End"
                ]
            }])

        .then(function (answers) {
            switch (answers.Menu) {
                case "* View Product Sales by Department":
                    view();
                    break;
                case "* Create New Department":
                    newD();
                    break;
                case "* End":
                    end()
                    break;
            }
        })
}
//
function view() {
    
        var sql = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) AS product_sales, (sum(products.product_sales)-departments.over_head_costs) AS total_profit FROM products INNER JOIN departments ON products.department_name = departments.department_name GROUP BY departments.department_name ORDER BY department_id asc";
        connection.query(sql, function (err, res) {
            if (err) throw err;
            var table = new Table({
                head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],colWidths: [15, 15,15,15,15]
            });
            for (let i = 0; i < res.length; i++) {
                table.push(Object.values(res[i]))
            }
            console.log(table.toString())
            ask()
        })
    
}
function newD() {
    inquirer
        .prompt([
            {
                name: "departmentN",
                message: "Please enter the name of the department: ",

            },
            {

                name: "department",
                message: "Please enter the overhead for this department: ",
            }

        ])
        .then(function (answers) {

            var query = connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: answers.departmentN,
                    over_head_costs: answers.department,

                },
                function (err, res) {
                    //console.log(res.affectedRows + " product inserted!\n");
                    ask()
                }
            );

            // logs the actual query being run
            // console.log(query.sql);
        })
}
function end() {
    connection.end()
}
