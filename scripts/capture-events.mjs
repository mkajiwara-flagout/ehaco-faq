import { chromium } from 'playwright';
import path from 'path';

const BASE_URL = 'https://ehaco.net';
const IMG_DIR = path.resolve('docs/public/images');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'ja-JP',
  });
  const page = await context.newPage();

  try {
    // 1. Find event detail links from search page
    console.log('1. Finding event links on search page...');
    await page.goto(`${BASE_URL}/search`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Get ALL links on the page
    const allLinks = await page.$$eval('a', (links) =>
      links
        .filter((l) => l.href && !l.href.includes('javascript:'))
        .map((l) => ({ href: l.href, text: l.textContent?.trim()?.substring(0, 80) }))
    );
    console.log('All links on search page:');
    for (const link of allLinks) {
      if (link.href.includes('ehaco.net') && !link.href.includes('/search') && !link.href.includes('/home') && !link.href.includes('/login')) {
        console.log(`  ${link.href} -> ${link.text}`);
      }
    }

    // Try different link patterns
    const eventPatterns = ['a[href*="detail"]', 'a[href*="events"]', 'a[href*="seminar"]', 'a[href*="/e/"]'];
    let eventUrl = null;

    for (const pattern of eventPatterns) {
      const links = await page.$$eval(pattern, (els) => els.map((e) => e.href));
      if (links.length > 0) {
        eventUrl = links[0];
        console.log(`\nFound event URL with pattern "${pattern}": ${eventUrl}`);
        break;
      }
    }

    // If no pattern works, try clicking on the first event card/title
    if (!eventUrl) {
      console.log('\nTrying to find clickable event elements...');
      // Look for elements that look like event titles
      const clickableEvents = await page.$$eval(
        'h2 a, h3 a, .event a, [class*="title"] a, [class*="card"] a',
        (els) => els.map((e) => ({ href: e.href, text: e.textContent?.trim()?.substring(0, 60) }))
      );
      console.log('Clickable events:', clickableEvents);
      if (clickableEvents.length > 0) {
        eventUrl = clickableEvents[0].href;
      }
    }

    if (eventUrl) {
      console.log(`\n2. Capturing event detail page: ${eventUrl}`);
      await page.goto(eventUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Top of event detail page
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/event-detail-top.png'),
        type: 'png',
      });
      console.log('  ✓ event-detail-top.png');

      // Full event detail page
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/event-detail-full.png'),
        type: 'png',
        fullPage: true,
      });
      console.log('  ✓ event-detail-full.png');

      // Scroll to bottom for ticket section
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/event-detail-bottom.png'),
        type: 'png',
      });
      console.log('  ✓ event-detail-bottom.png');
    } else {
      console.log('No event URLs found.');
    }

    // 3. Better search sidebar capture
    console.log('\n3. Better search sidebar capture...');
    await page.goto(`${BASE_URL}/search`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/search-page-sidebar-full.png'),
      type: 'png',
      fullPage: true,
    });
    console.log('  ✓ search-page-sidebar-full.png');

    console.log('\n=== Done ===');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

main();
