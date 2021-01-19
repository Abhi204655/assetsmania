const puppeteer = require("puppeteer");

let getSrc = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  let imgArr = await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll("img"));
    let links = elements.map((element) => {
      return element.src;
    });
    return links;
  });
  await browser.close();
  return imgArr;
};

const getAllImageLinks = async (req, res) => {
  try {
    const { url } = req.body;
    let imgSrc = await getSrc(url);
    return res.status(200).json({ status: "success", data: imgSrc });
  } catch (e) {
    return res.status(400).json({ status: "error", msg: e.message });
  }
};
exports.getAllImageLinks = getAllImageLinks;
