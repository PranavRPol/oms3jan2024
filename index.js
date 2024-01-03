const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());


app.post("/save",(req,res)=>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("oms30dec23");
	const coll = db.collection("customer");
	const record ={"_id":req.body.name,"phonenumber":req.body.phonenumber,"email":req.body.email,"address":req.body.address,"choise":req.body.choise};
	coll.insertOne(record)
	.then(result=>res.send(result))
	.catch(error=>res.send(error));
})

app.get("/gd",(req,res)=>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("oms30dec23");
	const coll = db.collection("customer");
	coll.find({}).toArray()
	.then(result=>res.send(result))
	.catch(error=>res.send(error));
})

app.delete("/remove",(req,res)=>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("oms30dec23");
	const coll = db.collection("customer");
	const data ={"_id":req.body.name};
	coll.deleteOne(data)
	.then(result=>res.send(result))
	.catch(error=>res.send(error));
	
})
app.put("/modify",(req,res)=>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("oms30dec23");
	const coll = db.collection("customer");
	coll.updateOne({"_id":req.body.name},{"$set":{"name":req.body.name,"phonenumber":req.body.phonenumber,"email":req.body.email,"address":req.body.address,"choise":req.body.choise}})
	.then(result=>res.send(result))
	.catch(error=>res.send(error));

});

app.listen(9000,()=>{console.log("ready @ 9000");});
