var express = require('express');
var app = express();
module.exports = app;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/draggz');

var DomSchema = new mongoose.Schema({
    url: String,
    changesAvailable: [String]
});

mongoose.model('DomChange', DomSchema)


var DomChange = mongoose.model('DomChange');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb'}));

app.get('/:url', function (req,res,next) {
	console.log('Hit the route jack', req.params)
	DomChange.findOne({url: req.params.url}).exec()
	.then(function (domchange){
		console.log('domchange', domchange)
		if (!domchange) new Error('No changes yet')
		else {res.json(domchange.changesAvailable)};
	}, function (err) {
		next(err)
	})
})

app.post('/', function (req,res,next) {
	DomChange.findOne({url: req.body.url}).exec()
	.then(function (newChangeDom){
		//console.log('NEW CHANGED DOM DOMDOMdomdom', newChangeDom)
		if (newChangeDom) {
			console.log('HIT URL POST IFIFIFIFIFIF:', req.body.url)
			newChangeDom.changesAvailable.push(req.body.changesAvailable)
			newChangeDom.save();
			
		}
		else if(!newChangeDom) {
			console.log('HIT URL POST ELSEELSEELSEELSE:', req.body.url)
			DomChange.create({url: req.body.url, changesAvailable: req.body.changesAvailable})
		}
	}, function (err) {
		console.log(err)
		next(err)
	})
})




// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});