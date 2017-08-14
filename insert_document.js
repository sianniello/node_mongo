/**
 * Created by Stefano on 14/08/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://steno87:110203_Ca@cluster0-shard-00-00-fxpno.mongodb.net:27017,cluster0-shard-00-01-fxpno.mongodb.net:27017,cluster0-shard-00-02-fxpno.mongodb.net:27017/db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var request = require('request');

MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    getRandomUser(function callback(user){
        var myobj = {
            name: user.name.first + ' ' + user.name.last,
            address: user.location.street
        };
        db.collection("customers").insertOne(myobj, function(err, res) {
            if(err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
});

function getRandomUser(callback) {
    var url = 'https://randomuser.me/api/?nat=GB';
    request(url, function(error, response, body){
        if(error) console.log(error);
        else {
            console.log(JSON.parse(body).results);
            return callback(JSON.parse(body).results[0]);
        }
    });
}
