const puppeteer = require('puppeteer-extra');
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

(async () => {
    console.log('Starting puppeteer')
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--autoplay-policy=no-user-gesture-required"]
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720
    });
    const recorder = new PuppeteerScreenRecorder(page);
    await recorder.start("out.mp4");
    await page.goto('https://akemi.is-a.dev/itzcuteakemi.github.io/index.html');
    await page.waitForTimeout(60000);
    await recorder.stop();
    await browser.close();
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
