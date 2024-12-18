import { StackItem } from '@/domain/stack';

export class StackService {
  static items: StackItem[] = [];

  addItem(value: StackItem) {
    StackService.items.push(value);
  }

  removeItem() {
    return StackService.items.pop() || null;
  }
}

export const stackService = new StackService();
