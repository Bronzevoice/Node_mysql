'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//CRUD API for a mysql databse called "noding" with a table previously seted and called in the url:

//Sets database connection
const connection = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'noding',
	multipleStatements : true
})


//Starts connection with database
connection.connect( (error) =>{
	if(error){
		console.log('error')
	}else{console.log('connected')}
})


app.get('/get/:table/:ID', (req,resp) => {

	let id = req.params.ID	

	connection.query("SELECT * FROM " + req.params.table +" where ID = ?",[id], (error, rows, fields) =>{
		//callback
		if(error){
			console.log("Error in the query" + error)	
		}else{
			console.log(" get " + rows + fields)
		}
	})
})


//Creates a registry named seted by the object "registry" in the table
app.post('/save/:table/', (req,resp) => {

	let registry = {ID: 'an ID', name : 'a name'};

	connection.query("INSERT INTO "+ req.params.table +" SET ?" , registry, (error, rows, fields) =>{
		//callback
		if(error){
			console.log("Error in the query" + error)	
		}else{
			console.log("nice posting")
		}
	})
})


//Updates name, accesing data by table name and ID
app.put('/update/:table/:id/:name', (req, resp) =>{
	let table = req.params.table
	let id = req.params.id
	let name = req.params.name

	connection.query( 'UPDATE '+ table + ' SET name = ? Where ID = ?', [name ,id], (err, result) => {
		if(err){
			console.log("Error in the query" + err)	
		}else{

			console.log('Changed ' + result.changedRows + ' rows');
		}
	}
	)
})

//Deletes a registry accesing it by ID and table
app.delete('/delete/:table/:ID', (req, res) => {
	let id = req.params.ID;
	let table = req.params.table

	connection.query('DELETE FROM '+table +' WHERE id = ?',[table, id] ,
		function (err, result) {
			if (err) {
				console.log('Delete method failed:' + err)
			};

			console.log('Deleted ' + result.changedRows + ' rows');
		}
		);	

})


app.listen(1337);



