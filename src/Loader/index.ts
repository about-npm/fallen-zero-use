/*
 * @Author       : fallen_zero
 * @Date         : 2024-01-18 11:21:45
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-03-19 16:06:51
 * @FilePath     : /zero-use/src/Loader/index.ts
 * @FileName     :
 */
import { LikePromise } from '../useRequest';
import { App, Component, createApp } from 'vue';

export class Loader {
  private app: App<Element> | null = null;

  /**
   * @param comp 组件
   * @param div 组件挂载的容器
   * @param teleport 容器
   */
  constructor(
    private comp: Component | (() => JSX.Element),
    private div: Element = document.createElement('div'),
    private teleport: Element = document.body,
    private useApp?: (app: App<Element>) => LikePromise<void>
  ) {}

  public async show() {
    this.app = createApp(this.comp);
    if (this.useApp) {
      await this.useApp(this.app);
    }
    this.teleport.appendChild(this.div);
    this.app.mount(this.div);
  }

  public hide() {
    this.app?.unmount();
    this.div.remove();
    this.app = null;
  }
}
