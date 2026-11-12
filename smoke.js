const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));

  const t0 = Date.now();
  await page.goto('http://localhost:8123/index.html', { timeout: 90000 });
  // 等待 loading 元素消失（模型 + BVH 构建完成）
  await page.waitForFunction(() => !document.getElementById('loading'), { timeout: 90000 }).catch(() => {});
  console.log('load+build ms:', Date.now() - t0);
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'shot_model_t0.png' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shot_model_initial.png' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shot_model_stable.png' });

  // 抓取丝袜中部拉扯
  const cx = 640, cy = 420;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 110, cy - 70, { steps: 15 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shot_model_stretch.png' });
  await page.mouse.up();
  await page.waitForTimeout(300);

  console.log('console errors:', errors.length ? errors.join('\n') : 'none');
  await browser.close();
})();
