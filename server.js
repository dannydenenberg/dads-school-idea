/**
For production build: yarn build and yarn start.
Hot reloading for development, though.
 */
let elasticlunr = require("elasticlunr");
const fs = require("fs");
const csv = require("csv-parser");

let colleges = [];

var index = elasticlunr(function () {
  this.addField("name");
  this.setRef("_id");
});

// read the college.csv list into the index searcher
fs.createReadStream("./colleges.csv")
  .pipe(csv())
  .on("data", (data) => colleges.push(data))
  .on("end", () => {
    console.log(colleges[0]);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]

    // add elements to search index
    colleges.map((el) => {
      index.addDoc(el);
    });
  });

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
app.use(cors());

app.use(express.static("public"));

// "/colleges?q=mit"
app.get("/colleges", (req, res) => {
  let collegeQuery = req.query.q;
  // console.log(`QUERY: ${collegeQuery}`);

  let searchResults = index.search(collegeQuery, {}); // [{ref:'3928', score: 4.34893}, {ref:'83', score: 6.3889}...]
  let schoolResults = searchResults.map((el) => {
    return colleges.filter((element) => element._id == el.ref)[0];
  });

  res.json(schoolResults);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
