import { chromium, firefox, webkit } from 'playwright';

export class PlaywrightWorld {
  constructor({ parameters, attach, log }) {
    this.parameters = parameters;
    this.attach = attach;
    this.log = log;
    this.browserName = process.env.BROWSER || 'chromium';
    this.baseURL = parameters?.baseURL || process.env.BASE_URL || 'http://localhost:5173';
  }

  async launch() {
    const launcher = { chromium, firefox, webkit }[this.browserName] || chromium;

    const isTrue = (v) => {
      if (v === undefined || v === null) return false;
      if (typeof v === 'boolean') return v;
      return ['1', 'true', 'yes', 'on'].includes(String(v).toLowerCase());
    };

    const headlessEnv = process.env.PLAYWRIGHT_HEADLESS;
    const isCI = isTrue(process.env.CI);
    const hasDisplay = !!process.env.DISPLAY || !!process.env.WAYLAND_DISPLAY;

    const headless = headlessEnv !== undefined
      ? isTrue(headlessEnv)
      : isCI
        ? true
        : !hasDisplay
          ? true
          : !isTrue(process.env.HEADED);

    this.browser = await launcher.launch({ headless });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}
