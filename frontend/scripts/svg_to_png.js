const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function convert() {
  const svgPath = 'c:\\Users\\Ankit\\Desktop\\AurionLabs\\frontend\\public\\logo.svg';
  const pngPath = 'c:\\Users\\Ankit\\Desktop\\AurionLabs\\frontend\\public\\logo.png';
  
  console.log('Reading SVG file...');
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  console.log('Launching Playwright browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to square 1200x1200
  await page.setViewportSize({ width: 1200, height: 1200 });
  
  // HTML containing the SVG centered and full size
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          overflow: hidden;
        }
        svg {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      ${svgContent}
    </body>
    </html>
  `;
  
  console.log('Setting page content...');
  await page.setContent(htmlContent);
  
  // Wait a small bit for rendering
  await page.waitForTimeout(500);
  
  console.log('Taking screenshot...');
  await page.screenshot({
    path: pngPath,
    omitBackground: true, // Make it transparent PNG!
    type: 'png'
  });
  
  console.log('Saved PNG to:', pngPath);
  await browser.close();
}

convert().catch(err => {
  console.error('Error during conversion:', err);
  process.exit(1);
});
