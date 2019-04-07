var mongoose = require('mongoose');

// define the schema for our user model
var documentSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    documentName: {
        type: String,
        required: true
    },
    launguage:{
        type: String,
        required: true
    },
    documentData:{
        type: String
    }
});

module.exports = mongoose.model('Document', documentSchema);
