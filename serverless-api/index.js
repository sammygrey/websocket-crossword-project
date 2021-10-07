// index.js

const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");

const WORDS_TABLE = process.env.WORDS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Get Word endpoint
app.get("/words/:word", function (req, res) {
  const params = {
    TableName: WORDS_TABLE,
    Key: {
      word: req.params.word,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get word" });
    }
    if (result.Item) {
      const { word, definition } = result.Item;
      res.json({ word, definition });
    } else {
      res.status(404).json({ error: "Word not found" });
    }
  });
});

// Create Word endpoint
app.post("/words", function (req, res) {
  const { word, definition } = req.body;
  if (typeof word !== "string") {
    res.status(400).json({ error: '"word" must be a string' });
  } else if (typeof definition !== "string") {
    res.status(400).json({ error: '"definition" must be a string' });
  }

  const params = {
    TableName: WORDS_TABLE,
    Item: {
      word: word,
      definition: definition,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create word" });
    }
    res.json({ word, definition });
  });
});

module.exports.handler = serverless(app);
