/*
 * @Author       : fallen_zero
 * @Date         : 2024-01-08 09:56:53
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-07-23 14:24:17
 * @FilePath     : /fallen-zero-use/src/useIntervalDate/index.ts
 * @FileName     : 实时获取时间
 */

import { dateFormat, DATE_FORMAT } from '../dateFormat';
import { onBeforeUnmount, onMounted, reactive, getCurrentInstance } from 'vue';

/** 实时获取时间 */
export const useIntervalDate = () => {

  const currentDate = new Date();

  const currDate = reactive({
    date: dateFormat(currentDate, DATE_FORMAT['DATE-']),
    time: dateFormat(currentDate, DATE_FORMAT['TIMES']),
    week: dateFormat(currentDate, DATE_FORMAT['WEEK']),
  });

  const setCurrDate = () => {
    const currentDate = new Date();
    currDate.date = dateFormat(currentDate, DATE_FORMAT['DATE-']);
    currDate.time = dateFormat(currentDate, DATE_FORMAT['TIMES']);
    currDate.week = dateFormat(currentDate, DATE_FORMAT['WEEK']);
  };

  let timer: ReturnType<typeof setInterval> | null = null;

  const clearTimer = () => {
    timer && clearInterval(timer);
    timer = null;
  };

  const startTimer = () => {
    clearTimer();
    timer = setInterval(setCurrDate, 1000);
  };

  if (getCurrentInstance()) {
    onMounted(() => {
      startTimer();
    });

    onBeforeUnmount(() => {
      timer && clearInterval(timer);
    });
  } else {
    startTimer();
  }

  return { currDate };
};
