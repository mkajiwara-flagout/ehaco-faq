import { chromium } from 'playwright';
import path from 'path';

const IMG_DIR = path.resolve('docs/public/images');
const EVENT_URL = 'https://ehaco.net/events/0e166790-13b9-4495-a2bd-96bfffb0d8e2';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'ja-JP',
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to event page...');
    await page.goto(EVENT_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // 1. Event detail - top (header + thumbnail + title area)
    console.log('1. Event detail top...');
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/event-detail-top.png'),
      type: 'png',
    });
    console.log('  ✓ event-detail-top.png');

    // 2. Event detail - full page
    console.log('2. Event detail full page...');
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/event-detail-full.png'),
      type: 'png',
      fullPage: true,
    });
    console.log('  ✓ event-detail-full.png');

    // 3. Event info area (left side: thumbnail, title, dates, description)
    console.log('3. Event info area...');
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/event-detail-info.png'),
      type: 'png',
      clip: { x: 0, y: 60, width: 850, height: 740 },
    });
    console.log('  ✓ event-detail-info.png');

    // 4. Event ticket / right sidebar area
    console.log('4. Event ticket sidebar...');
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/event-detail-sidebar.png'),
      type: 'png',
      clip: { x: 830, y: 60, width: 450, height: 740 },
    });
    console.log('  ✓ event-detail-sidebar.png');

    // 5. Scroll down to see ticket section more clearly
    console.log('5. Scrolling to ticket section...');
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/event-ticket-area.png'),
      type: 'png',
      clip: { x: 780, y: 0, width: 500, height: 600 },
    });
    console.log('  ✓ event-ticket-area.png');

    // 6. Scroll to SNS share buttons + organizer info
    console.log('6. SNS share & organizer info...');
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/event-share-organizer.png'),
      type: 'png',
      clip: { x: 780, y: 0, width: 500, height: 800 },
    });
    console.log('  ✓ event-share-organizer.png');

    // 7. Navigate to organizer page
    console.log('7. Organizer page...');
    const orgLink = await page.$('a[href*="/organizer/"]');
    if (orgLink) {
      const orgHref = await orgLink.getAttribute('href');
      const orgUrl = orgHref.startsWith('http') ? orgHref : `https://ehaco.net${orgHref}`;
      console.log(`  Found organizer link: ${orgUrl}`);
      await page.goto(orgUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Organizer profile page - top
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/organizer-page-top.png'),
        type: 'png',
      });
      console.log('  ✓ organizer-page-top.png');

      // Organizer profile page - full
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/organizer-page-full.png'),
        type: 'png',
        fullPage: true,
      });
      console.log('  ✓ organizer-page-full.png');
    }

    // 8. Go back and capture the bookmark button area
    console.log('8. Bookmark button area...');
    await page.goto('https://ehaco.net/search', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Find event cards with bookmark
    const cards = await page.$$('[class*="card"], [class*="Card"], article');
    if (cards.length > 0) {
      const box = await cards[0].boundingBox();
      if (box) {
        await page.screenshot({
          path: path.join(IMG_DIR, 'participant/event-card-bookmark.png'),
          type: 'png',
          clip: { x: box.x, y: box.y, width: box.width, height: box.height },
        });
        console.log('  ✓ event-card-bookmark.png');
      }
    }

    // Also try a wider capture of event list area
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/event-list-area.png'),
      type: 'png',
      clip: { x: 280, y: 120, width: 1000, height: 400 },
    });
    console.log('  ✓ event-list-area.png');

    console.log('\n=== Event detail capture complete ===');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

main();
