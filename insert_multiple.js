/**
 * Created by Stefano on 14/08/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';
var request = require('request');

MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    getRandomUser(function callback(user) {
        var myobj = [];
        for(var i=0; i<user.length; i++)
            myobj.push({
                name: user[i].name.first + ' ' + user[i].name.last,
                address: user[i].location.street
            });
        db.collection("customers").insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
});

function getRandomUser(callback) {
    var url = 'https://randomuser.me/api/?nat=AU,BR,CA,CH,DE,DK,ES,FI,FR,GB,IE,NL,NZ,TR,US&results=1000&inc=name,location';
    request(url, function(error, response, body){
        if(error) console.log(error);
        else {
            //console.log(JSON.parse(body).results);
            return callback(JSON.parse(body).results);
        }
    });
}

