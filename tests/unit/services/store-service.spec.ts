import { storeService, StoreService } from '@/services/store.service';

describe('@tests/services/store-service', () => {
  const key = 'key';
  const value = 'value';
  const ttl = 60;

  afterEach(() => {
    StoreService.map.clear();
  });

  afterAll(() => {
    storeService.clearInterval();
  });

  describe('set', () => {
    describe('when payload without ttl', () => {
      it('should set key value pair', () => {
        storeService.set(key, value);
        const entry = StoreService.map.get(key);
        expect(entry).toEqual({ value });
      });
    });

    describe('when payload with ttl', () => {
      it('should set key value pair', () => {
        storeService.set(key, value, ttl);
        const entry = StoreService.map.get(key);
        expect(entry).toEqual({
          value,
          expirationTimestamp: expect.any(Number),
        });
      });
    });
  });

  describe('get', () => {
    describe('when there is no entry', () => {
      it('should return null', () => {
        expect(storeService.get(key)).toBeNull();
      });
    });

    describe('when there is entry', () => {
      describe('when entry without ttl', () => {
        beforeEach(() => {
          StoreService.map.set(key, { value });
        });

        it('should return value', () => {
          expect(storeService.get(key)).toBe(value);
        });
      });

      describe('when entry with ttl', () => {
        describe('when ttl expired', () => {
          beforeEach(() => {
            StoreService.map.set(key, { value, expirationTimestamp: 1 });
          });

          it('should delete entry', () => {
            storeService.get(key);
            expect(StoreService.map.get(key)).toBeUndefined();
          });

          it('should return null', () => {
            expect(storeService.get(key)).toBeNull();
          });
        });

        describe('when ttl not yet expired', () => {
          beforeEach(() => {
            StoreService.map.set(key, {
              value,
              expirationTimestamp: Date.now() + ttl,
            });
          });

          it('should return value', () => {
            expect(storeService.get(key)).toBe(value);
          });
        });
      });
    });
  });

  describe('delete', () => {
    describe('when there is no entry', () => {
      it('should return null', () => {
        expect(storeService.delete(key)).toBeNull();
      });
    });

    describe('when there is entry', () => {
      beforeEach(() => {
        StoreService.map.set(key, { value });
      });

      it('should delete entry', () => {
        storeService.delete(key);
        expect(StoreService.map.get(key)).toBeUndefined();
      });

      it('should return delete value', () => {
        expect(storeService.delete(key)).toBe(value);
      });
    });
  });
});
