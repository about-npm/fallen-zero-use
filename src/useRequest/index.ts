/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-08 14:50:11
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2025-06-02 15:08:31
 * @FilePath     : /fallen-zero-use/src/useRequest/index.ts
 * @FileName     :
 */
import { getCurrentInstance, onMounted, ref } from 'vue';

/** 返回数据 */
export interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void;
}

/** Promise 对象 */
export type IPromise<T> = CancelablePromise<T> | Promise<T>;

export type LikePromise<T> = T | IPromise<T>;

export type RequestResult<T> = T extends (...args: any[]) => IPromise<infer R>
  ? R
  : any;

export interface RequestOptions {
  /** 状态判断 */
  checkStatus?: (res: any) => boolean;
  /** 错误信息提示方法 */
  showError?: (err: any) => void;
  /** 加载方法 */
  showLoading?: (loading: boolean) => void;
}

export class CreateRequest {
  constructor(private config: RequestOptions = {}) {}

  public requestApi = <T extends (...args: any[]) => IPromise<any>>(
    api: T,
    params: [...Parameters<T>],
    {
      immediate = true,
      success,
      fail,
      complate,
      checkStatus = this.config.checkStatus,
      showLoading = this.config.showLoading,
    }: {
      success?: (res: RequestResult<T>) => LikePromise<void>;
      fail?: (err: any) => LikePromise<boolean | void>;
      complate?: () => LikePromise<void>;
      immediate?: boolean;
      checkStatus?: (res: RequestResult<T>) => boolean;
      showLoading?: (loading: boolean) => void;
    } = {}
  ) => {
    // 当前取消请求函数
    let currentCancel: (() => void) | undefined;
    // 请求参数
    let currParams = params;
    // 请求数据
    const data = ref<RequestResult<T>>();
    // 错误信息
    const error = ref();
    // 是否正在请求
    const loading = ref<boolean>(false);

    /** 开始请求 */
    const run = async () => {
      try {
        currentCancel && currentCancel();
        loading.value = true;
        showLoading && showLoading(true);
        const method = api(...currParams);
        currentCancel = 'cancel' in method ? method.cancel : void 0;
        const res = await method;
        if (!checkStatus || checkStatus(res)) {
          data.value = res;
          error.value = void 0;
          success && (await success(res));
          return;
        }
        throw res;
      } catch (err) {
        data.value = void 0;
        error.value = err;
        if (fail && (await fail(err))) {
          return;
        }
        this.config.showError && this.config.showError(err);
      } finally {
        currentCancel = void 0;
        loading.value = false;
        showLoading && showLoading(false);
        complate && (await complate());
      }
    };

    /** 设置请求参数
     * @param newParams 新的请求参数
     * @param immediate 是否立即请求
     */
    const setParams = async (newParams: Parameters<T>, immediate = true) => {
      currParams = newParams;
      immediate && (await run());
    };

    /** 重置请求 */
    const reset = async () => {
      currParams = params;
      await run();
    };

    if (immediate) {
      if (getCurrentInstance()) {
        onMounted(() => {
          run();
        });
      } else {
        run();
      }
    }

    return {
      /** 开始请求 */
      run,
      /**
       * 设置请求参数
       * @param newParams 新的请求参数
       * @param immediate 是否立即请求
       */
      setParams,
      /** 重置请求 */
      reset,
      /** 请求数据 */
      data,
      /** 请求错误信息 */
      error,
      /** 请求加载状态 */
      loading,
      /** 取消请求 */
      cancel: currentCancel,
    };
  };
}

const request = new CreateRequest();

export const useRequest = request.requestApi.bind(request);
