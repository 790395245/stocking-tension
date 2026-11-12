import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--use-gl=angle','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:8123/', { waitUntil: 'load' });
await p.waitForTimeout(8000);
const setRim = async (v) => {
  await p.evaluate((val) => { const el = document.getElementById('rimSlider'); el.value = val; el.dispatchEvent(new Event('input')); }, v);
  await p.waitForTimeout(700);
};
await setRim(0);
await p.screenshot({ path: '/tmp/ab-rim0.png', clip: { x: 420, y: 40, width: 320, height: 860 } });
await setRim(1.2);
await p.screenshot({ path: '/tmp/ab-rim12.png', clip: { x: 420, y: 40, width: 320, height: 860 } });
await setRim(0.55);
await p.screenshot({ path: '/tmp/ab-rim055.png', clip: { x: 420, y: 40, width: 320, height: 860 } });
await b.close();
console.log('done');
