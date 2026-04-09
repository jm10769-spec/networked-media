const express = require('express');
const nedb = require('@seald-io/nedb');

const app = express();
const database = new nedb({ filename: 'mydatabase.txt', autoload: true });

app.use(express.static('public'));
app.use(express.json())

app.get('/api/retrieve', (req, res) => {
    database.find({}, (err, docs) => {
        res.json(docs);
    });
});
app.post('/api/add', (req, res) => {
    console.log(req.body);
    let dataToBeAdded = {
		content: req.body.content,
	};
    database.insert(dataToBeAdded, (err, insertedData) => {
		res.sendStatus(204);
    });
});


   app.listen(6001, () => {
	console.log('app is running at http://localhost:6001');
});

