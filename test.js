let elasticlunr = require("elasticlunr");
const fs = require("fs");
const csv = require("csv-parser");

let results = [];

var index = elasticlunr(function () {
  this.addField("name");
  this.setRef("_id");
});

fs.createReadStream("./colleges.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results[0]);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]

    // add elements to search index
    results.map((el) => {
      index.addDoc(el);
    });

    let searchResults = index.search("yale"); // [{ref:'3928', score: 4.34893}, {ref:'83', score: 6.3889}...]
    let schoolResults = searchResults.map((el) => {
      return results.filter((element) => element._id == el.ref)[0];
    });

    console.log(schoolResults);

    // fastcsv.write(results, { headers: true }).pipe(ws);
  });
