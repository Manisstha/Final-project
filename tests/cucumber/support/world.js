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
    this.browser = await launcher.launch({ headless: process.env.HEADED ? false : true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}
