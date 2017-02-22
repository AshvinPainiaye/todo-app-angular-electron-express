var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql');
var crypto = require('crypto')
const hash = crypto.createHash('sha1')
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*
 *  Connection to the sql database
 * 
 */


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'simplon974',
    database: 'express-todo'
});

connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')
})

/*
 *  Creates the task table
 * 
 */

connection.query('CREATE TABLE IF NOT EXISTS todo(id int primary key AUTO_INCREMENT, task varchar(255),complete BOOLEAN)', function (err, result) {
    if (err) throw err;
});
// connection.query('CREATE TABLE IF NOT EXISTS user(id int primary key AUTO_INCREMENT, username varchar(255),password varchar(255))', function (err, result) {
//     if (err) throw err;
// });


/*
 *  List all todo-list tasks
 * 
 */

app.get('/', function (req, res) {
    connection.query('SELECT * FROM todo', function (err, result) {
        if (err) throw err
        res.status(200).json(result)
    })
})

/*
 *  Add a new task to the todo-list
 * 
 */

app.post('/add', function (req, res) {
    var data = req.body;
    connection.query('INSERT INTO todo SET ?', data, function (err, result) {
        if (err)
            throw err;
    });
    res.status(200).send(data)
});

/*
 *  Update a task state ( complete or not )
 * 
 */

app.post('/update', function (req, res) {
    var data = req.body;
    connection.query('SELECT * FROM todo WHERE id = ' + data.id, function (err, result) {
        if (err) throw err
        else {
            result[0].complete == 1 ? result[0].complete = 0 : result[0].complete = 1
        }
        console.log(result[0].complete, data.id)
        connection.query('UPDATE todo SET complete = ' + result[0].complete + ' WHERE  id = ' + data.id, function (err, result) {
            if (err) throw err
            console.log(result)
        })
    })

})

/*
*  Delete a task 
* 
*/

app.delete('/delete/:id', function (req, res) {
    var id = req.params.id
    console.log(id)
    connection.query('DELETE FROM todo WHERE id = ' + id, function (err, result) {
        if (err) throw err
        res.status(200).send("ok")
    })
})


/*
 *  Log a user and show his own task list
 * 
 */

app.get('/login', function (req, res) {
    var user_data = [req.body.username, req.body.password];
    connection.query('SELECT * from user', user_data, function (err, result) {
        if (err) throw err
        // var token = shasum.update(password).digest('hex')
        // result.password = token
        res.status(200).send(result)

    })
})

app.listen(8080);
