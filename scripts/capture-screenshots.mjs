import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://ehaco.net';
const IMG_DIR = path.resolve('docs/public/images');

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function captureScreenshot(page, url, filename, options = {}) {
  const { selector, waitFor, scrollTo, clip } = options;
  console.log(`Capturing: ${filename} from ${url}`);

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  if (waitFor) {
    await page.waitForSelector(waitFor, { timeout: 10000 }).catch(() => {});
  }

  // Wait for any animations
  await page.waitForTimeout(1500);

  if (scrollTo) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, scrollTo);
    await page.waitForTimeout(500);
  }

  const screenshotOptions = {
    path: path.join(IMG_DIR, filename),
    type: 'png',
  };

  if (selector) {
    const element = await page.$(selector);
    if (element) {
      await element.screenshot(screenshotOptions);
    } else {
      console.warn(`  Selector "${selector}" not found, taking full page screenshot`);
      await page.screenshot({ ...screenshotOptions, fullPage: false });
    }
  } else if (clip) {
    await page.screenshot({ ...screenshotOptions, clip });
  } else {
    await page.screenshot({ ...screenshotOptions, fullPage: false });
  }

  console.log(`  ✓ Saved: ${filename}`);
}

async function main() {
  await ensureDir(path.join(IMG_DIR, 'participant'));
  await ensureDir(path.join(IMG_DIR, 'organizer'));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'ja-JP',
  });
  const page = await context.newPage();

  try {
    // === Public pages (no login required) ===

    // 1. TOP page - full view
    await captureScreenshot(page, `${BASE_URL}/home`, 'participant/top-page-full.png');

    // 2. TOP page - search area
    await captureScreenshot(page, `${BASE_URL}/home`, 'participant/top-page-search.png', {
      selector: 'header, [class*="search"], [class*="hero"], form',
    });

    // 3. Search/filter page
    await captureScreenshot(page, `${BASE_URL}/search`, 'participant/search-page-full.png');

    // 4. Login page
    await captureScreenshot(page, `${BASE_URL}/login`, 'participant/login-page.png');

    // 5. TOP page - header area (for login/navigation)
    await captureScreenshot(page, `${BASE_URL}/home`, 'participant/top-page-header.png', {
      clip: { x: 0, y: 0, width: 1280, height: 120 },
    });

    // 6. Try to find an event detail page
    await page.goto(`${BASE_URL}/search`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Look for event links
    const eventLinks = await page.$$eval('a[href*="/event/"]', (links) =>
      links.map((l) => l.href).slice(0, 1)
    );

    if (eventLinks.length > 0) {
      await captureScreenshot(page, eventLinks[0], 'participant/event-detail-page.png');

      // Scroll to ticket section
      await page.goto(eventLinks[0], { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500);

      // Try to find ticket section
      const ticketSection = await page.$('[class*="ticket"], [id*="ticket"], [class*="Ticket"]');
      if (ticketSection) {
        await ticketSection.screenshot({
          path: path.join(IMG_DIR, 'participant/event-ticket-section.png'),
          type: 'png',
        });
        console.log('  ✓ Saved: participant/event-ticket-section.png');
      }
    }

    // === Organizer login page ===
    // Try common organizer login URLs
    for (const orgUrl of [
      `${BASE_URL}/organizer/login`,
      `${BASE_URL}/org/login`,
      `${BASE_URL}/admin/login`,
    ]) {
      try {
        const response = await page.goto(orgUrl, { waitUntil: 'networkidle', timeout: 10000 });
        if (response && response.status() < 400) {
          await page.waitForTimeout(1500);
          await page.screenshot({
            path: path.join(IMG_DIR, 'organizer/login-page.png'),
            type: 'png',
          });
          console.log(`  ✓ Saved: organizer/login-page.png from ${orgUrl}`);
          break;
        }
      } catch {
        continue;
      }
    }

    console.log('\n=== Screenshot capture complete ===');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

main();
