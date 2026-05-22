const { chromium } = require('playwright-chromium');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 600 });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });

    console.log('1. Opening app...');
    await page.goto('http://localhost:8080/ai-coach-app.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screen1_home.png' });

    console.log('2. Clicking Quick Demo...');
    await page.click('button:has-text("Quick Demo")');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screen2_dashboard.png' });

    console.log('3. Clicking Today\'s Task tab...');
    await page.click('button:has-text("Today\'s Task")');
    await page.waitForTimeout(800);

    console.log('4. Clicking Open Code Editor Below...');
    await page.click('button:has-text("Open Code Editor Below")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screen3_editor_open.png' });

    console.log('5. Selecting Python...');
    await page.selectOption('#inlineLangSelect', 'python');
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'screen4_python_selected.png' });

    console.log('6. Clicking inline Run button...');
    // Click the Run button inside the inline coding panel specifically
    await page.$eval('#inlineCodingPanel button:nth-of-type(2)', btn => btn.click());
    console.log('   Waiting for Pyodide to load and run (~15s first time)...');
    await page.waitForTimeout(18000);

    console.log('7. Taking final screenshot...');
    await page.screenshot({ path: 'screen5_output.png', fullPage: true });

    const output = await page.$eval('#inlineOutputArea', el => el.textContent);
    console.log('\n=== Output from browser ===');
    console.log(output);
    console.log('===========================\n');

    await browser.close();
    console.log('Done! Screenshots saved.');
})().catch(err => { console.error(err); process.exit(1); });
