const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");

const writeFileAsync = promisify(fs.writeFile);

const scrapeUrl = (i) => {
  return `https://villagerdb.com/items/wallpaper/page/${i}?game=nh&isAjax=true`;
};

const getPages = async () => {
  const pages = await axios.get(scrapeUrl(1));
  const totalPages = await pages.data.totalPages;
  return totalPages;
};

const writeJSON = async (obj) => {
  writeFileAsync("./src/data/wallpaper.json", JSON.stringify(obj, null, 4));
  console.log("File has been created");
};

const getData = async () => {
  let acData = {};
  // let totalPages = 4;

  const totalPages = await getPages();

  console.log(totalPages);

  for (let i = 1; i <= totalPages; i++) {
    let res = await axios.get(scrapeUrl(i));
    await res.data.results.map((results) => {
      acData[results.id] = results;
      return results;
    });
    console.log("Items Stored:", Object.keys(acData).length);
  }
  await writeJSON(acData);
};

getData();
