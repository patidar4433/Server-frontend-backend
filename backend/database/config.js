// DataBase connectivity
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const database = "MyRealstate";

const getConnect = async () => {
  const result = await MongoClient.connect(url);
  const db = result.db(database);
  const collection = db.collection("Users");
  return collection;
  //   const data = await collection.find().toArray();
  //   console.log(data);
  //   return data;
};

module.exports = { getConnect };