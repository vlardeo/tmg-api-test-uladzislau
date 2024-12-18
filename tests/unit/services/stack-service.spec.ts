import { StackService, stackService } from '@/services/stack.service';

describe('@tests/services/stack-service', () => {
  afterEach(() => {
    StackService.items = [];
  });

  describe('addItem', () => {
    it('should add an item to the stack', () => {
      stackService.addItem('item1');
      expect(StackService.items).toEqual(['item1']);
    });
  });

  describe('removeItem', () => {
    describe('when there are items in the stack', () => {
      beforeEach(() => {
        stackService.addItem('item1');
        stackService.addItem('item2');
      });

      it('should remove the last added item from the stack', () => {
        stackService.removeItem();
        expect(StackService.items).toEqual(['item1']);
      });

      it('should return the last added item from the stack', () => {
        expect(stackService.removeItem()).toBe('item2');
      });
    });

    describe('when there are no items in the stack', () => {
      it('should return null', () => {
        expect(stackService.removeItem()).toBeNull();
      });
    });
  });
});
