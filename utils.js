const fs = require("fs");

const saveDataToFile = (filename, content) => {
  // console.log(content);
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = saveDataToFile;
