/**
 * 消息内容
 * @param 消息类型
 * @param 消息内容
 */
export interface IMsgInfo<T = any> {
  type: string;
  content: T;
}

export const createTagMsg = (name: string) => {
  const channle = new BroadcastChannel(name);

  /**
   * 发送消息
   * @param type 消息类型
   * @param content 消息内容
   */
  function sendMsg<T = any>(type: string, content: T) {
    channle.postMessage({
      type,
      content,
    });
  }

  /**
   * 监听消息
   * @param callback 回调函数
   */
  function listenMsg<T = any>(callback: (msgInfo: IMsgInfo<T>) => void) {
    const handler = (e: MessageEvent<IMsgInfo<T>>) => {
      callback && typeof callback === 'function' && callback(e.data);
    };
    channle.addEventListener('message', handler);

    return () => channle.removeEventListener('message', handler);
  }

  return {
    sendMsg,
    listenMsg,
  };
};
