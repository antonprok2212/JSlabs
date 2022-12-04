const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const app = express();
const jsonParser = express.json();
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("sitedb").collection("users");
    app.listen(3000, function () {
        console.log("The server is waiting for a connection...");
    });
});

app.get("/api/users", function (req, res) {

    const collection = req.app.locals.collection;
    collection.find({}).toArray(function (err, users) {

        if (err) return console.log(err);
        res.send(users)
    });

});

app.get("/api/users/:id", function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({ _id: id }, function (err, user) {

        if (err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userLastName = req.body.last_name;
    const userAge = req.body.age;
    const userAddress = req.body.address;

    const user = { name: userName,  last_name: userLastName, age: userAge, address: userAddress };

    const collection = req.app.locals.collection;
    collection.insertOne(user, function (err, result) {

        if (err) return console.log(err);
        res.send(user);
    });
});

app.delete("/api/users/:id", function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({ _id: id }, function (err, result) {

        if (err) return console.log(err);
        let user = result.value;
        res.send(user);
    });
});

app.put("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const userName = req.body.name;
    const userLastName = req.body.last_name;
    const userAge = req.body.age;
    const userAddress = req.body.address;

    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({ _id: id }, { $set: { name: userName, last_name: userLastName, age: userAge, address: userAddress } },
        { returnOriginal: false }, function (err, result) {

            if (err) return console.log(err);
            const user = result.value;
            res.send(user);
        });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});