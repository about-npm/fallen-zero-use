/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:48:59
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-02-23 11:33:48
 * @FilePath     : /zero-use/src/useDefer/index.ts
 * @FileName     :
 */

import { ref } from 'vue';

export class UseDefer {
  private frameCount = ref(0);
  private maxFrameCount = ref(1000);

  constructor(maxFrameCount = 1000) {
    this.maxFrameCount.value = maxFrameCount;
    this.refreshFrameCount();
  }

  private refreshFrameCount() {
    requestAnimationFrame(() => {
      this.frameCount.value++;
      if (this.frameCount.value < this.maxFrameCount.value) {
        this.refreshFrameCount();
      }
    });
  }

  public setMaxCount(maxFrameCount: number) {
    this.maxFrameCount.value = maxFrameCount;
    this.refreshFrameCount();
  }

  public getMaxCount() {
    return this.maxFrameCount.value;
  }

  defer(showInFrameCount: number) {
    return this.frameCount.value >= showInFrameCount;
  }
}
