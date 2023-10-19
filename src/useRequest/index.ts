/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-08 14:50:11
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-19 10:03:57
 * @FilePath     : /zero-use/src/useRequest/index.ts
 * @FileName     :
 */
import { ref } from 'vue';

/**
 * 请求方法
 * @param fn 请求函数
 * @param params 请求参数
 * @returns
 */
export const useRequest = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ...params: Parameters<T>
) => {
  // 请求参数
  let currParams = params;

  // 请求数据
  const data =
    ref<T extends (...args: any[]) => Promise<infer R> ? R : unknown>();
  // 错误信息
  const error = ref();
  // 是否正在请求
  const loading = ref<boolean>(false);

  /** 设置请求参数
   * @param newParams 新的请求参数
   */
  const setParams = (...newParams: Parameters<T>) => {
    currParams = newParams;
  };

  /** 开始请求 */
  const start = async () => {
    loading.value = true;
    try {
      const res = await fn(...currParams);
      data.value = res;
      error.value = void 0;
    } catch (err) {
      error.value = err;
    }

    loading.value = false;
  };

  /** 重置请求 */
  const reset = async () => {
    currParams = params;
    await start();
  };

  return {
    /** 请求数据 */
    data,
    /** 请求错误信息 */
    error,
    /** 是否正在请求 */
    loading,
    /** 开始请求 */
    start,
    /** 重置请求 */
    reset,
    /** 设置请求参数 */
    setParams,
  };
};
