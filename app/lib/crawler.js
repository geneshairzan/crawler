const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

export function dataparsing(body, config) {
  console.log("data parsing evaluate");
  const $ = cheerio.load(body);
  let content = [];
  console.log(config.child);

  $(config.root).map(function (ix) {
    var temp = {};
    config.child.map((dx) => {
      if (dx.type == "html") {
        temp[dx.dataname] = $(this)
          .find(dx.element)
          .html()
          .replace(/\n/g, "")
          .replace(/\t/g, "")
          .replace(/\s\s/g, "");
      }
      if (dx.type == "href") {
        temp[dx.dataname] = $(this).find(dx.element).attr("href");
      }
      if (dx.type == "src") {
        temp[dx.dataname] = $(this).find(dx.element).attr("src");
      }
    });
    content.push({ result: JSON.stringify(temp) });
  });

  return content;
}

// await page.goto(url, { waitUntil: "load" });
// await page.goto(url, { waitUntil: "domcontentloaded" });
// await page.goto(url, { waitUntil: "networkidle0" });
// await page.goto(url, { waitUntil: "networkidle2" });

export async function getHTML(config) {
  console.log(`Start Crawling ${config.url}`);
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/firefox",
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  console.log("waiting page loaded");
  await page.goto(config.url, { waitUntil: "networkidle2" });

  await autoScroll(page);
  await page.screenshot({ path: `test.png`, fullPage: true });
  console.log("page loaded");
  // await page.waitForSelector(".css-18wke1n", { timeout: 15000 });

  const body = await page.evaluate(() => {
    return document.querySelector("body").innerHTML;
  });
  console.log("body evaluated");
  await browser.close();
  return body;
}

async function autoScroll(page) {
  let cfg = {};

  await page.evaluate(async (cfg) => {
    async function scrollChild(cf) {
      await new Promise((resolve, reject) => {
        var cscroll = 0;
        var timer = setInterval(() => {
          window.scrollTo(0, document.body.scrollHeight * 0.8);
          cscroll += 1;

          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 1000);

          if (cscroll >= 5) {
            clearInterval(timer);
            resolve();
          }
        }, 1000);
      });
    }
    await scrollChild(cfg);
  }, cfg);
}
