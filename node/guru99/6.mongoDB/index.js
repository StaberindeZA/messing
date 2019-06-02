const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const assert = require('assert'); 

var url = 'mongodb://localhost:27017';
var app = express();

var str = "";

const dbName = 'EmployeeDB';

const client = new MongoClient(url);

const findDocuments = function(db, callback) {
    const collection = db.collection('Employee');

    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

const findDocumentsTemp = function(db, callback) {
    const collection = db.collection('Employee');

    const cursor = collection.find({});

    cursor.forEach(function(doc) {
        console.log(doc.Employeeid);
        // if( doc.Employeeid != null ) {
        str = str + "&nbsp;&nbsp;&nbsp;Employee id&nbsp;&nbsp;&nbsp;" + doc.Employeeid + "</br>";
        // };
    });

    callback();
}

const findDocumentByID = function(db, callback, id) {
    const collection = db.collection('Employee');

    collection.find({'Employeeid': id}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

app.route('/Employeeid').get(function(req, res) {
    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
    
        const db = client.db(dbName);
    
        // findDocuments(db, function() {
        //     client.close();
        // });
        // findDocumentByID(db, function() {
        //     client.close();
        // }, 1);
        findDocumentsTemp(db, function() {
            client.close();
        })

        res.send(str);
    });
})

// MongoClient.connect(url, function(err, db) {
//     // var cursor = db.collection('Employee').find();

//     // cursor.each(function(err, doc) {
//     //     console.log(doc);
//     // });

//     console.log("Connected to it");

//     db.close();
// });

var server = app.listen(3000, function () {});