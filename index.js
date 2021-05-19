const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v1: uuidv1 } = require('uuid');

const fs = require("fs");

const app = express();
app.use(express.static('HTML'))

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.post("/books", (req, res) => {
  const booksList = readJSONFile();
  var newId = uuidv1();
  var newBook =
  {
    title: req.body.title,
    description: req.body.description,
    id: newId
  };
  booksList.push(newBook);
  writeJSONFile(booksList);
  res.send(booksList);
});

app.get("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  var found = 0;
  for(var i = 0; i < booksList.length; i++)
    if(booksList[i].id == req.params.id)
    {
      res.send(booksList[i]);
      found = 1;
      break;
    }
  if(found == 0)
      res.send("Not found!");
});

app.get("/books", (req, res) => {
  const booksList = readJSONFile();
  res.send(booksList);
});

app.put("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  var found = 0;
  for(var i = 0; i < booksList.length; i++)
        if(booksList[i].id == req.params.id)
        {
            found = 1;
            booksList[i].title = req.body.title;
            booksList[i].description = req.body.description;
            res.send(booksList[i]);
            break;
        }
    writeJSONFile(booksList);
    if(found == 0)
      res.send("Not found");
});

app.delete("/books/:id", (req, res) => {
  const booksList = readJSONFile();
    var found = 0;
    for(var i = 0; i < booksList.length; i++)
        if(booksList[i].id == req.params.id)
        {
            booksList.splice(i, 1);
            found = 1;
            break;
        }
    writeJSONFile(booksList);
    if(found == 0) res.send("Not found!");
    else res.send("Item deleted!");

});

function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["books"];
}

function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ books: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);