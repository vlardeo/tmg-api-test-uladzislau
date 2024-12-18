export type StoreItemValue = string | number;

export type StoreItem = {
  value: StoreItemValue;
  expirationTimestamp?: number;
};
