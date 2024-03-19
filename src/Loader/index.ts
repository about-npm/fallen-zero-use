/*
 * @Author       : fallen_zero
 * @Date         : 2024-01-18 11:21:45
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-03-19 15:48:09
 * @FilePath     : /zero-use/src/Loader/index.ts
 * @FileName     :
 */
import { App, Component, createApp } from 'vue';

export class Loader {
  private app: App<Element> | null = null;

  constructor(
    private comp: Component | (() => JSX.Element),
    private div: Element = document.createElement('div')
  ) {}

  public show() {
    this.app = createApp(this.comp);
    document.body.appendChild(this.div);
    this.app.mount(this.div);
  }

  public hide() {
    this.app?.unmount();
    this.div.remove();
    this.app = null;
  }
}
