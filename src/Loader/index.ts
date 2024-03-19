/*
 * @Author       : fallen_zero
 * @Date         : 2024-01-18 11:21:45
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-03-19 16:06:51
 * @FilePath     : /zero-use/src/Loader/index.ts
 * @FileName     :
 */
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
    private teleport: Element = document.body
  ) {}

  public show() {
    this.app = createApp(this.comp);
    this.teleport.appendChild(this.div);
    this.app.mount(this.div);
  }

  public hide() {
    this.app?.unmount();
    this.div.remove();
    this.app = null;
  }
}
