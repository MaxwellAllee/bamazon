var mysql = require("mysql");
var inquirer = require("inquirer")
var Table = require('cli-table')
var table = new Table()
var rest =[]
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
function view() {
     var query = connection.query("SELECT * FROM products ", function (err, res) {
    rest = res
      tableS()  
      
    });
}
function tableS(){
  console.log(rest)
}







function end() {
    connection.end()
}
