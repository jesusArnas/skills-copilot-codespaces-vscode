// Create web server
// 1. npm init
// 2. npm install express --save
// 3. npm install body-parser --save
// 4. npm install mongoose --save
// 5. npm install ejs --save
// 6. npm install method-override --save

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride  = require('method-override');

// Connect to DB
mongoose.connect('mongodb://localhost/comments');
// Set view engine
app.set('view engine', 'ejs');
// Set public folder
app.use(express.static('public'));
// Use method override
app.use(methodOverride('_method'));
// Use body parser
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose Schema
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Mongoose Model
var Comment = mongoose.model('Comment', commentSchema);

// RESTful Routes
app.get('/', function(req, res){
    res.redirect('/comments');
});

// INDEX ROUTE
app.get('/comments', function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            console.log(err);
        }else{
            res.render('index', {comments: comments});
        }
    });
});

// NEW ROUTE
app.get('/comments/new', function(req, res){
    res.render('new');
});

// CREATE ROUTE
app.post('/comments', function(req, res){
    Comment.create(req.body.comment, function(err, newComment){
        if(err){
            console.log(err);
        }else{
            res.redirect('/comments');
        }
    });
});

// SHOW ROUTE
app.get('/comments/:id', function(req, res){
    Comment.findById(req.params.id, function(err, foundComment){
        if(err){
            console.log(err);
        }else{
            res.render('show', {comment: foundComment});
        }
    });
});

// EDIT ROUTE
app.get('/comments/:id/edit', function(req, res){
    Comment.findById(req.params.id, function(err, foundComment){
        if(err){
            console.log(err);
        }else{
            res.render('edit', {comment: foundComment});
        }
    });
});

// UPDATE ROUTE
app.put('/comments/:id', function(req, res){
    Comment.findByIdAndUpdate(req.params.id, req.body
