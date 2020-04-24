const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");

const writeFileAsync = promisify(fs.writeFile);

const getPages = async () => {
  const pages = await axios.get(
    "https://villagerdb.com/items/furniture/page/1?game=nh&isAjax=true"
  );
  const totalPages = await pages.data.totalPages;
  return totalPages;
};

const writeJSON = async (obj) => {
  writeFileAsync("./src/testData.json", JSON.stringify(obj, null, 4));
  console.log("File has been created");
};

const getData = async () => {
  let acData = {};
  let totalPages = 4;

  // const totalPages = await getPages();

  console.log(totalPages);

  for (let i = 1; i <= totalPages; i++) {
    let res = await axios.get(
      `https://villagerdb.com/items/furniture/page/${i}?game=nh&isAjax=true`
    );
    console.log(res.data.results.length);
    await res.data.results.map((results) => {
      acData[results.id] = results;
      console.log("This should be 1st:", Object.keys(acData).length);
      return results;
    });
    console.log("This should be 2nd:", Object.keys(acData).length);
  }
  await writeJSON(acData);
};

getData();
