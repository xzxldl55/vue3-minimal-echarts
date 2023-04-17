/**
 * 全局事件总线
 * - 发布订阅模式
 */

export type EventCallback = (...args: any[]) => unknown;
export type EventKey = string | symbol;
export type EventBusDep = Set<EventCallback>;
export type EventBusMap = Map<EventKey, EventBusDep>;

export const EVENT_NAME = {
  ROUTE_CHANGE: Symbol('ROUTE_CHANGE'),
  WINDOW_RESIZE: Symbol('WINDOW_RESIZE'),
};

class GlobalEventBus {
  listener: EventBusMap;
  onceListener: EventBusMap;
  constructor() {
    this.listener = new Map();
    this.onceListener = new Map();
  }

  // 设置监听函数
  on(key: EventKey, fn: EventCallback) {
    if (!this.listener.has(key)) {
      this.listener.set(key, new Set<EventCallback>().add(fn));
    }
    this.listener.get(key)?.add(fn);
  }

  once(key: EventKey, fn: EventCallback) {
    if (!this.onceListener.has(key)) {
      this.onceListener.set(key, new Set<EventCallback>().add(fn));
    }
    this.onceListener.get(key)?.add(fn);
  }

  emit(key: EventKey, ...args: any[]) {
    [this.listener, this.onceListener].forEach((listener) =>
      listener.get(key)?.forEach((fn) => fn(...args))
    );
    this.onceListener.delete(key); // 移除一次性的监听函数
  }

  remove(key: EventKey, fn: EventCallback) {
    // once触发后将自动移除，无需考虑remove
    return !!this.listener.get(key)?.delete(fn);
  }
}

const globalEventBus = new GlobalEventBus();

export default globalEventBus;
