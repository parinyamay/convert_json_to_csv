const fs = require("fs");
const json2csv = require("json2csv").parse;

// Replace 'input.json' with the actual path to your JSON file
const jsonFilePath = "./import/leaderboard.json";

// Read the JSON file
fs.readFile(jsonFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  // Parse JSON data
  const jsonData = JSON.parse(data);

  // Creat new object
  const newObject = [];
  for (const [outkey, outValue] of Object.entries(jsonData)) {
    for (const [inKey, inValue] of Object.entries(outValue)) {
      if (JSON.stringify(inValue).length > 1) {
        const dataArray = inValue;
        dataArray.forEach((element) => {
          newObject.push({
            trackId: `${outkey}`,
            carName: `${inKey}`,
            ...element,
          });
        });
      }
    }
  }

  // Convert JSON to CSV
  const csvData = json2csv(newObject, {
    header: true,
  });

  // Output file name
  const csvFilePath = `./export/leaderboard_output.csv`;

  // Write CSV file
  fs.writeFile(csvFilePath, csvData, "utf8", (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
    } else {
      console.log("Conversion complete. CSV file saved at:", csvFilePath);
    }
  });
});
