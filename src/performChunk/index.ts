/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-21 13:43:23
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-01-15 10:15:59
 * @FilePath     : /zero-use/src/performChunk/index.ts
 * @FileName     : 分时函数
 */

/** 分时函数
 * @param datas 需要分时的数据或者次数
 * @param taskHandler 需要执行的任务
 * @param scheduler 调度器
 */
export function preformChunk<T>(
  datas: Array<T> | number,
  taskHandler: (data: T, index: number) => void,
  scheduler: (task: (isGoOn: () => boolean) => void) => void
) {
  const list = typeof datas === 'number' ? Array(datas) : datas;
  if (list.length === 0) return;
  let i = 0;

  /** 执行下一块任务 */
  function _run() {
    if (i >= list.length) return;
    scheduler((isGoOn) => {
      while (isGoOn() && i < list.length) {
        taskHandler(list[i], i);
        i++;
      }
      _run();
    });
  }

  _run();
}

/** 在浏览器环境使用 requestIdleCallback 进行分时任务
 * @param datas 需要分时的数据或者次数
 * @param taskHandler 需要执行的任务
 */
export function browserPerformChunk<T>(
  datas: Array<T> | number,
  taskHandler: (data: T, index: number) => void
) {
  /** requestIdleCallback 调度器
   * @param task 需要执行的任务
   */
  const scheduler = (task: (isGoOn: () => boolean) => void) => {
    requestIdleCallback((deadline) => {
      task(() => deadline.timeRemaining() > 0);
    });
  };

  preformChunk(datas, taskHandler, scheduler);
}

/** 使用 setTimeout 进行分时任务
 * @param datas 需要分时的数据或者次数
 * @param taskHandler 需要执行的任务
 * @param [duration=50] 执行时长(毫秒), 默认50毫秒
 * @param [waitTime=100] 等待时间（毫秒）, 默认100毫秒
 */
export function timeoutPerformChunk<T>(
  datas: Array<T> | number,
  taskHandler: (data: T, index: number) => void,
  duration: number = 50,
  waitTime: number = 100
) {
  /** setTimeout 调度器
   * @param task 需要执行的任务
   */
  const scheduler = (task: (isGoOn: () => boolean) => void) => {
    setTimeout(() => {
      const start = Date.now();
      task(() => Date.now() - start < duration);
    }, waitTime);
  };

  preformChunk(datas, taskHandler, scheduler);
}
