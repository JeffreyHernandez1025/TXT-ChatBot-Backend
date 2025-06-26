// importing dependencies
import puppeteer from "puppeteer";
// workaround for cheerio
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const cheerio = require("cheerio");

// function scraps TXT website for html data
export default async function getRetrievalData() {
  try {
    const websites = [
      "https://urbantxt.org/home",
      "https://urbantxt.org/about/team",
      "https://urbantxt.org/about/culture",
      "https://urbantxt.org/txt-programs/scla",
      "https://urbantxt.org/txt-programs/hnc-participant",
      "https://urbantxt.org/get-involved/jobs",
      "https://urbantxt.org/get-involved/fellow",
      "https://urbantxt.org/get-involved/more-ways-to-give",
      "https://urbantxt.org/get-involved/alumni",
      "https://urbantxt.org/get-involved/volunteer",
      "https://urbantxt.org/get-involved/mentor",
      "https://urbantxt.org/news/articles-videos",
      "https://urbantxt.org/news/podcasts",
      "https://give.urbantxt.org/campaign/667132/donate",
    ];

    const allReturnData = [];

    // launches puppeteer as a headless broswer search,
    // and waits until there are no more than 2 network connections
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (let i = 0; i < websites.length; i++) {
      await page.goto(websites[i], {
        waitUntil: "networkidle2",
      });
      const content = await page.content();

      // parse HTML with cheerio
      const $ = cheerio.load(content);

      // iterate through all text tags
      $("h1, h2, h3, h4, h5, h6, p").each((_idx, el) => {
        // get each elements text
        const returnData = $(el).text();

        // store text in array
        allReturnData.push(returnData);
      });
      console.log(`scraped page ${i + 1}`)
    }

    // return array
    const allData = [...new Set(allReturnData)];

    return allData;
  } catch (e) {
    throw e;
  }
}
