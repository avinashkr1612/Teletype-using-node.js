
var Document = require('./models/document');

module.exports = function(app, passport) {

    app.get('/',(req, res) => {
        res.render('index.ejs' )
    })

    app.get('/chat',(req,res) => {
        res.render('index.html');
    })
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


      // process the signup form
      app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // DOCUMENT CREATE ==============================
    // =====================================
    app.post('/document/:id',isLoggedIn, (req,res) => {
        console.log(req.params.id);
        console.log(req.body);
        // create a new document
        var document = new Document({
            authorId: req.params.id,
            documentName: req.body.documentName,
            launguage: req.body.launguage,
            documentData: ''
        });

        document.save((err,doc) => {
            if(err) throw err;

            console.log(doc);
            res.render('document.ejs', {document: doc});
        });        
    })

    // =====================================
    // DOCUMENT UPDATE =====================
    // =====================================
    app.post('/document/update/:id',isLoggedIn,(req, res) => {
        console.log(req.params.id);
        console.log(req.body);

        Document.findByIdAndUpdate(req.params.id, {$set: {documentData: req.body.documentData}}, {new: true}, (err, doc) => {
            if(err) throw err;

            console.log('update data');
            console.log(doc);
            res.render('document.ejs', {document: doc});
        });
    });

    app.get('/document/fetch/:id',isLoggedIn,(req,res) => {
        Document.find({authorId: req.params.id}, (err, doc) => {
            if(err) throw err;

            console.log(doc);
        })
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}