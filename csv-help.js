/**
No NEED to use anymore. I used this to create 'colleges.csv'.
 */
const csv = require("csv-parser");
const fs = require("fs");

const fastcsv = require("fast-csv");
const ws = fs.createWriteStream("colleges.csv");

let results = [];

fs.createReadStream("./college-list.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results[0]);
    let counter = 0;
    results = results.map((el) => {
      counter++;
      return {
        _id: counter,
        name: el.name,
      };
    });
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]

    fastcsv.write(results, { headers: true }).pipe(ws);
  });
