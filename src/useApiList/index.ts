/*
 * @Author       : fallen_zero
 * @Date         : 2024-01-17 10:19:01
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-01-17 10:28:39
 * @FilePath     : /zero-use/src/useApiList/index.ts
 * @FileName     :
 */

import { useRequest } from '../useRequest';
import { Ref, getCurrentInstance, onMounted, ref } from 'vue';

/** 下拉滚动加载列表
 * @param api 请求方法
 * @param [params] 请求参数, 默认
 * @param {object} [options]
 * @param {boolean} [options.immediate] 是否立即执行
 * @example
 * 
const listApi = ({ page, limit }: { page: number; limit: number }) => {
  return new Promise<{
    list: number[];
    total: number;
  }>((resolve) => {
    setTimeout(() => {
      if (page <= 5) {
        resolve({
          list: Array(limit)
            .fill(0)
            .map((_, index) => (page - 1) * limit + index + 1),
          total: 0,
        });
        return;
      }

      resolve({
        list: Array(limit - 3)
          .fill(0)
          .map((_, index) => (page - 1) * limit + index + 1),
        total: 0,
      });
    }, 500);
  });
};

const { list, loading, finished, refreshing, onLoad, reset } = useApiList(listApi);
 */
export const useApiList = <T, P extends { page?: number; limit?: number }>(
  api: (params: P) => Promise<{
    list: T[];
    total: number;
  }>,
  params?: P,
  { immediate = true }: { immediate?: boolean } = {}
) => {
  const defaultParams = { page: 1, limit: 10 } as P;
  const initParams = params ?? defaultParams;
  let currentParams = initParams;
  const {
    data,
    start,
    setParams: setApiParams,
  } = useRequest(api, currentParams);
  const loading = ref(false);
  const finished = ref(false);
  const refreshing = ref(false);
  const list = ref([]) as Ref<T[]>;
  const total = ref(0);
  let currLimit = currentParams.limit ?? 10;
  let page = 1;

  const setParams = async (_params: Partial<Omit<P, 'page'>>) => {
    list.value = [];
    page = 1;
    currentParams = { ...currentParams, ..._params, page };
    setApiParams(currentParams);
    currLimit = currentParams.limit ?? 10;
    finished.value = false;
    await getData();
  };

  const getData = async () => {
    loading.value = true;
    await start();
    list.value = [...list.value, ...(data.value?.list ?? [])];
    total.value = data.value?.total ?? 0;
    loading.value = false;
    page++;
    if (data.value && data.value.list.length < currLimit) {
      finished.value = true;
    }
  };

  const onLoad = async () => {
    setApiParams({ ...currentParams, page });
    await getData();
  };

  const reset = async () => {
    await setParams({});
  };

  if (immediate) {
    if (getCurrentInstance()) {
      onMounted(() => {
        onLoad();
      });
    } else {
      onLoad();
    }
  }

  return {
    /* 列表数据 */
    list,
    /** 总数 */
    total,
    /** 加载状态 */
    loading,
    /** 是否请求结束 */
    finished,
    /** 是否正在刷新 */
    refreshing,
    /** 修改请求参数 */
    setParams,
    /** 加载方法 */
    onLoad,
    /** 重置 */
    reset,
  };
};
