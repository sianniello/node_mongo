/**
 * Created by Stefano on 14/08/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://steno87:110203_Ca@cluster0-shard-00-00-fxpno.mongodb.net:27017,cluster0-shard-00-01-fxpno.mongodb.net:27017,cluster0-shard-00-02-fxpno.mongodb.net:27017/db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
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
    var url = 'https://randomuser.me/api/?nat=GB&results=500&inc=name,location';
    request(url, function(error, response, body){
        if(error) console.log(error);
        else {
            //console.log(JSON.parse(body).results);
            return callback(JSON.parse(body).results);
        }
    });
}

