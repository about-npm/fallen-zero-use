/*
 * @Author       : fallen_zero
 * @Date         : 2024-01-08 09:56:53
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-03-06 08:57:50
 * @FilePath     : /zero-use/src/useIntervalDate/index.ts
 * @FileName     : 实时获取时间
 */

import { dateFormat, DATE_FORMAT } from '../dateFormat';
import { onBeforeUnmount, onMounted, reactive, getCurrentInstance } from 'vue';

/** 实时获取时间 */
export const useIntervalDate = () => {
  const currDate = reactive({
    date: dateFormat(new Date(), DATE_FORMAT['DATE-']),
    time: dateFormat(new Date(), DATE_FORMAT['TIMES']),
    week: dateFormat(new Date(), DATE_FORMAT['WEEK']),
  });

  const setCurrDate = () => {
    currDate.date = dateFormat(new Date(), DATE_FORMAT['DATE-']);
    currDate.time = dateFormat(new Date(), DATE_FORMAT['TIMES']);
    currDate.week = dateFormat(new Date(), DATE_FORMAT['WEEK']);
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
