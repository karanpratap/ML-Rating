const express = require('express');
const {spawn, spawnSync} = require('child_process');
const app = express();
const port = 3000;
//const bodyParser = require('body-parser');

//app.use(bodyParser.json());

app.post('/:news', (req, res) => { 
	var dataToSend;
	// spawn new child process to call the python script
	if(!req.params.news)
		return res.json(0);
	try{
		const op = spawnSync('python3', ['./prediction.py', req.params.news], {encoding: "utf8"});
		console.log(op.output);
		dataToSend = op.stdout.split(' ');
		dataToSend = parseFloat(dataToSend[dataToSend.length-3]);
		res.json(dataToSend);
	}catch(err){
		res.send('Python Problem');
	}
})
app.listen(port, () => console.log("App listening on port ${port}!"))
