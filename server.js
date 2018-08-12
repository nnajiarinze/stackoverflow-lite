var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var loki = require('lokijs');
var Question = require('models/Question')

var db = new loki('stack.json');

var questionsCollection = db.addCollection('questions');
var answersCollection = db.addCollection('answers');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8493;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//Post a question
router.post('/questions', function(req, res) {
var id=1;
     if(questionsCollection.count()){
         id = questionsCollection.count()+1;
         questionsCollection.insert({ id: parseInt(id) ,name: req.body.name, category: req.body.category });
     }else{
         questionsCollection.insert({ id: parseInt(id) ,name: req.body.name, category: req.body.category });
     }

    res.json({ message: 'Question Uploaded successfully' });
});



//Post an answer to a question
router.post('/questions/:question_id/answers', function(req, res) {
    var qId=req.params.question_id;
    var id =1;
    if(answersCollection.count()){
        id = answersCollection.count()+1;
        answersCollection.insert({ id: parseInt(id) ,qId: qId, answer: req.body.answer });
    }else{
        answersCollection.insert({ id: parseInt(id) ,qId: qId, answer: req.body.answer });
    }


    var result = answersCollection.find();

    res.json(result);
});

//get question by id
router.get('/questions/:question_id',function(req, res){

    var questionId = req.params.question_id;
    var result = questionsCollection.find({ id: { $eq: parseInt(questionId) } });

    res.json(result);
});



//get all questions
router.get('/questions/',function(req, res){


    var result = questionsCollection.find();

    res.json(result);
});


// REGISTER OUR ROUTE
// all of our routes will be prefixed with /api
app.use('/api', router);

var questionGilbert = new Question(1,'question here','categoerea');
app.listen(port);
