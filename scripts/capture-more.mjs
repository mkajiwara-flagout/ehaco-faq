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
    // 1. Search page - capture the sidebar filter area
    console.log('1. Capturing search page sidebar...');
    await page.goto(`${BASE_URL}/search`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Full page screenshot (scrollable)
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/search-page-sidebar.png'),
      type: 'png',
      clip: { x: 0, y: 100, width: 320, height: 700 },
    });
    console.log('  ✓ search-page-sidebar.png');

    // 2. Find and capture an event detail page
    console.log('2. Looking for event detail pages...');
    const eventLinks = await page.$$eval('a[href*="/event/"]', (links) =>
      links.map((l) => ({ href: l.href, text: l.textContent?.trim() }))
    );
    console.log(`  Found ${eventLinks.length} event links`);

    if (eventLinks.length > 0) {
      const eventUrl = eventLinks[0].href;
      console.log(`  Navigating to: ${eventUrl}`);
      await page.goto(eventUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Event detail - top area
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/event-detail-top.png'),
        type: 'png',
      });
      console.log('  ✓ event-detail-top.png');

      // Event detail - full page
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/event-detail-full.png'),
        type: 'png',
        fullPage: true,
      });
      console.log('  ✓ event-detail-full.png');

      // Try to scroll to ticket section and capture it
      const ticketExists = await page.evaluate(() => {
        const allText = document.body.innerText;
        return allText.includes('チケット') || allText.includes('申込');
      });
      if (ticketExists) {
        await page.evaluate(() => {
          const elements = [...document.querySelectorAll('*')];
          for (const el of elements) {
            if (el.textContent?.includes('チケット') && el.offsetHeight < 500) {
              el.scrollIntoView({ block: 'center' });
              break;
            }
          }
        });
        await page.waitForTimeout(500);
        await page.screenshot({
          path: path.join(IMG_DIR, 'participant/event-ticket-section.png'),
          type: 'png',
        });
        console.log('  ✓ event-ticket-section.png');
      }

      // Capture SNS share buttons area if visible
      const shareExists = await page.evaluate(() => {
        return document.body.innerText.includes('共有') ||
               document.querySelector('[class*="share"]') !== null;
      });
      if (shareExists) {
        console.log('  Share section found');
      }
    }

    // 3. Registration page
    console.log('3. Capturing registration page...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Full login page (scrolled to show registration button)
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/login-page-full.png'),
      type: 'png',
      fullPage: true,
    });
    console.log('  ✓ login-page-full.png');

    // Click on registration button if present
    const regButton = await page.$('a:has-text("会員登録"), button:has-text("会員登録"), a:has-text("新規"), button:has-text("新規")');
    if (regButton) {
      await regButton.click();
      await page.waitForTimeout(3000);
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/registration-page.png'),
        type: 'png',
      });
      console.log('  ✓ registration-page.png');

      // Full registration form
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/registration-page-full.png'),
        type: 'png',
        fullPage: true,
      });
      console.log('  ✓ registration-page-full.png');
    }

    // 4. Organizer login - try different URLs
    console.log('4. Finding organizer login page...');
    const orgUrls = [
      `${BASE_URL}/organizer/login`,
      `${BASE_URL}/org/login`,
      `${BASE_URL}/organizer`,
      `${BASE_URL}/admin`,
    ];

    for (const url of orgUrls) {
      try {
        const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
        const currentUrl = page.url();
        const pageText = await page.evaluate(() => document.body?.innerText?.substring(0, 200));
        console.log(`  Tried ${url} -> ${currentUrl} (${resp?.status()})`);
        console.log(`  Content: ${pageText?.substring(0, 100)}`);

        if (pageText && (pageText.includes('ログイン') || pageText.includes('主催者')) && !pageText.includes('存在しません')) {
          await page.screenshot({
            path: path.join(IMG_DIR, 'organizer/login-page.png'),
            type: 'png',
          });
          console.log('  ✓ organizer/login-page.png');
          break;
        }
      } catch {
        continue;
      }
    }

    // 5. TOP page scrolled down to show "おすすめ" and "新着" sections
    console.log('5. Capturing TOP page sections...');
    await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Scroll to show new events section
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/top-page-events.png'),
      type: 'png',
    });
    console.log('  ✓ top-page-events.png');

    // Scroll further for more sections
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/top-page-more-events.png'),
      type: 'png',
    });
    console.log('  ✓ top-page-more-events.png');

    // 6. Bookmark area if visible on event cards
    console.log('6. Capturing event card with bookmark...');
    await page.goto(`${BASE_URL}/search`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Find first event card and capture it
    const firstCard = await page.$('[class*="card"], [class*="event-item"], article, .event');
    if (firstCard) {
      await firstCard.screenshot({
        path: path.join(IMG_DIR, 'participant/event-card.png'),
        type: 'png',
      });
      console.log('  ✓ event-card.png');
    }

    console.log('\n=== Additional screenshot capture complete ===');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

main();
