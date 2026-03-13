import { chromium } from 'playwright';
import path from 'path';

const IMG_DIR = path.resolve('docs/public/images');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'ja-JP',
  });
  const page = await context.newPage();

  try {
    // 1. Event detail page - focused on ticket section
    console.log('1. Event detail - ticket section...');
    await page.goto('https://ehaco.net/events/87eefaa2-3828-4b8e-ba93-3ffd949f542b', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(2000);

    // Find ticket/apply section
    const ticketEl = await page.$('[class*="ticket"], [class*="Ticket"]');
    if (ticketEl) {
      await ticketEl.screenshot({
        path: path.join(IMG_DIR, 'participant/event-ticket-section.png'),
        type: 'png',
      });
      console.log('  ✓ event-ticket-section.png (element)');
    } else {
      // Try to scroll to the right side with ticket info
      await page.evaluate(() => {
        const els = document.querySelectorAll('*');
        for (const el of els) {
          if (el.textContent?.includes('イベントチケット') && el.getBoundingClientRect().width < 600) {
            el.scrollIntoView({ block: 'center' });
            return;
          }
        }
      });
      await page.waitForTimeout(500);

      // Capture the right portion of the page where ticket section usually is
      await page.screenshot({
        path: path.join(IMG_DIR, 'participant/event-ticket-section.png'),
        type: 'png',
        clip: { x: 780, y: 200, width: 500, height: 400 },
      });
      console.log('  ✓ event-ticket-section.png (clip)');
    }

    // 2. Organizer registration page
    console.log('2. Organizer registration page...');
    await page.goto('https://org.ehaco.net/register', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(IMG_DIR, 'organizer/registration-page.png'),
      type: 'png',
    });
    console.log('  ✓ organizer/registration-page.png');

    // Full page
    await page.screenshot({
      path: path.join(IMG_DIR, 'organizer/registration-page-full.png'),
      type: 'png',
      fullPage: true,
    });
    console.log('  ✓ organizer/registration-page-full.png');

    // 3. Organizer login page
    console.log('3. Organizer login page...');
    await page.goto('https://org.ehaco.net/login', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(IMG_DIR, 'organizer/org-login-page.png'),
      type: 'png',
    });
    console.log('  ✓ organizer/org-login-page.png');

    // 4. Search page - full sidebar filter visible
    console.log('4. Search page with sidebar fully expanded...');
    await page.goto('https://ehaco.net/search', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(2000);

    // Scroll sidebar to show all filter options
    await page.evaluate(() => {
      const sidebar = document.querySelector('[class*="sidebar"], [class*="filter"], aside, nav');
      if (sidebar) sidebar.scrollTop = 0;
    });
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/search-filter-area.png'),
      type: 'png',
      clip: { x: 0, y: 60, width: 340, height: 740 },
    });
    console.log('  ✓ search-filter-area.png');

    // Also capture the "絞り込みボタン" area
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/search-filter-bottom.png'),
      type: 'png',
      clip: { x: 0, y: 0, width: 340, height: 800 },
    });
    console.log('  ✓ search-filter-bottom.png');

    // 5. Event detail full page for better quality
    console.log('5. Event detail page sections...');
    await page.goto('https://ehaco.net/events/87eefaa2-3828-4b8e-ba93-3ffd949f542b', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(2000);

    // Event info area (left side with title, date, details)
    await page.screenshot({
      path: path.join(IMG_DIR, 'participant/event-detail-info.png'),
      type: 'png',
      clip: { x: 0, y: 60, width: 800, height: 500 },
    });
    console.log('  ✓ event-detail-info.png');

    console.log('\n=== Final capture complete ===');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

main();
