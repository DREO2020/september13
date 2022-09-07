const mysql = require("mysql")

//recommended to use .env rather than the following

let connection = mysql.createConnection({
    host: "eu-cdbr-west-03.cleardb.net",
    port: 3306,
    user: "beb92eb3ab6f15",
    password: "ff56b22b",
    database: "igoinvest"
});

connection.connect((errors) => {
    if (errors) {
        console.log(errors);
    } else {
        console.log("Connected to MySQL server!");
    }
});

module.exports = {connection};
