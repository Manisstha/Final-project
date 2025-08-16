import { setWorldConstructor, Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { PlaywrightWorld } from './world.js';

setWorldConstructor(PlaywrightWorld);

Before(async function () {
  await this.launch();
});

After(async function (scenario) {
  // Attach trace on failure
  if (scenario.result?.status !== Status.PASSED) {
    try {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
    } catch {}
  }
  await this.close();
});

AfterStep(async function ({ result }) {
  if (result?.status !== Status.PASSED) {
    try {
      const screenshot = await this.page.screenshot();
      await this.attach(screenshot, 'image/png');
    } catch {}
  }
});
