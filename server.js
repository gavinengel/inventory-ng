var express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  methodOverride = require('method-override'),
  port = parseInt(process.env.PORT, 10) || 4000;

/*app.use(function(req, res, next) {
  if (req.headers.origin) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
  if (req.method === 'OPTIONS') return res.send(200)
}
next()
}) */

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));


var Item = require('./app/models/items');


var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://hegel:hegel@proximus.modulusmongo.net:27017/Iqu6jypy', function (err) {
  if (err) {
    console.error('\x1b[31m', 'Could not connect to MongoDB!');
    console.log(err);
  }
});

//app.get("/", function (req, res) {
  //res.redirect("/");
//});

// API ROUTES

var router = express.Router();

router.use(function(req, res, next) {

	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here

});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'You are in the api root !' });
});

// more routes for our API will happen here

router.route('/items')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {

    console.log(req.body.name);
		var item = new Item(); 		// create a new instance of the Bear model
		item.name = req.body.name;  // set the bears name (comes from the request)
    item.description = req.body.description;
    item.price = req.body.price;
    item.quantity = req.body.quantity;
		// save the bear and check for errors
		item.save(function(err) {
			if (err){
				res.send(err);
      }
			//res.setHeader('Content-Type','application/json');
                	//res.setHeader('Access-Control-Allow-Origin','*');
                	//res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
                	//res.writeHead(200);
			//res.json({ message: 'Bear created!' });
			res.json({message: "Kevin says:" + req.body.name});

		});
	})

	.get(function(req, res){
		Item.find(function(err, item){
			if (err)
				res.send(err);
				res.json( item );
			//for (i in item){
			//res.json(item[i]._id);
		//};
		});

	});





router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {

		var bear = new Bear(); 		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
				res.send(err);
			//res.setHeader('Content-Type','application/json');
                	//res.setHeader('Access-Control-Allow-Origin','*');
                	//res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
                	//res.writeHead(200);
			//res.json({ message: 'Bear created!' });
			res.json({message: "Kevin says:" + req.body.name});

		});
	})

	.get(function(req, res){
		Bear.find(function(err, bears){
			if (err)
				res.send(err);
			res.json(bears);
		});

	});

router.route('/items/:item_id')



	// get the bear with that id
	.get(function(req, res){

		Item.findById(req.params.item_id, function(err, item){
			if (err)
			res.send(err);
		res.json(item);
	});

})

	.put(function(req, res){
		Item.findById(req.params.item_id, function(err, item){
			if (err) res.send(err);
		//update the bear
		item.name = req.body.name;
    item.description = req.body.description;
    item.quantity = req.body.quantity;
    item.price = req.body.price;

		//save the bear
		item.save(function(err){
			if (err) res.send(err);
		res.json({message: "Item updated!" });
		});
	});
	})



	.delete(function(req, res){

		Item.remove({
			_id: req.params.item_id
		}, function (err, item){
			if (err) res.send(err);
		res.json({message: "Item removed."});
		});
	});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);




console.log("Listening at http://localhost:" + port);
app.listen(port);
