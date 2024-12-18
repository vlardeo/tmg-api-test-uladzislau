import { StoreItem, StoreItemValue } from '@/domain/store';

const MINUTE_IN_MS = 1000;

export class StoreService {
  static map: Map<string, StoreItem> = new Map();
  private readonly cleanupInterval: NodeJS.Timeout;
  private readonly ttlCheckInterval = 60 * MINUTE_IN_MS;

  constructor() {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.ttlCheckInterval);
  }

  set(key: string, value: StoreItemValue, ttl?: number) {
    const payload: StoreItem = { value };

    if (ttl) {
      payload.expirationTimestamp = Date.now() + ttl * MINUTE_IN_MS;
    }

    StoreService.map.set(key, payload);
  }

  get(key: string) {
    const nowTimestamp = Date.now();
    const entry = StoreService.map.get(key);

    if (
      !entry ||
      (entry.expirationTimestamp && entry.expirationTimestamp <= nowTimestamp)
    ) {
      this.delete(key);
      return null;
    }

    return entry.value;
  }

  delete(key: string) {
    const entry = StoreService.map.get(key);

    if (!entry) {
      return null;
    }

    const { value } = entry;

    StoreService.map.delete(key);

    return value;
  }

  // For testing purposes
  clearInterval() {
    clearInterval(this.cleanupInterval);
  }

  private cleanup() {
    const nowTimestamp = Date.now();
    for (const [key, entry] of StoreService.map.entries()) {
      if (
        entry.expirationTimestamp &&
        entry.expirationTimestamp <= nowTimestamp
      ) {
        StoreService.map.delete(key);
      }
    }
  }
}

export const storeService = new StoreService();
