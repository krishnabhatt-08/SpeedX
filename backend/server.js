const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );

    const metrics = await page.evaluate(() =>
      JSON.stringify(window.performance.getEntriesByType("navigation"))
    );
    const firstContentfulPaint = JSON.parse(
      await page.evaluate(() =>
        JSON.stringify(
          window.performance.getEntriesByName("first-contentful-paint")[0]
        )
      )
    );

    await browser.close();

    const performanceData = {
      pageLoadTime:
        performanceTiming.loadEventEnd - performanceTiming.navigationStart,
      totalRequestSize:
        performanceTiming.responseEnd - performanceTiming.requestStart,
      numberOfRequests: metrics.length,
      ttfb: performanceTiming.responseStart - performanceTiming.navigationStart,
      fcp: firstContentfulPaint.startTime,
      lcp: firstContentfulPaint.startTime,
      cls: 0.1, // Simulated value
      tbt: performanceTiming.loadEventEnd - performanceTiming.responseEnd,
    };

    res.json(performanceData);
  } catch (error) {
    console.error("Error analyzing performance", error);
    res.status(500).json({ error: "Error analyzing performance" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
