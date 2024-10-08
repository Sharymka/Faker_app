const express = require('express');
const path = require('path');


const {generateRecords} = require('./src/mainGenerator');

const app = express();
const port = process.env.PORT || 3001;
const api = express.Router();
app.use('/api', api);
api.use(express.json());


app.use(express.static(path.join(__dirname, 'build')));

api.get('/generate', (req, res) => {
	const { region, errors, seed, page } = req.query;
	const combinedSeed = parseInt(`${seed}${page}`);
	res.json(generateRecords(region, errors, combinedSeed));
});

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
