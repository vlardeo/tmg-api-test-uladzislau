import { aStoreService } from '@tests/mocks/store.service';
jest.mock('@/services/store.service', () => ({
  storeService: aStoreService,
}));

import {
  setStoreValue,
  getStoreValue,
  deleteStoreValue,
  SetStoreValueRequest,
  GetStoreValueRequest,
  DeleteStoreValueRequest,
} from '@/controllers/store.controller';
import { mockNext, mockResponse } from '@tests/mocks/express-api';

describe('@controllers/store-controller', () => {
  afterEach(jest.clearAllMocks);

  describe('setStoreValue', () => {
    let req: SetStoreValueRequest;

    const payload = {
      key: 'k1',
      value: 'v1',
      ttl: 1,
    };

    beforeEach(() => {
      req = {} as SetStoreValueRequest;
      req.body = payload;
    });

    it('should call store service', async () => {
      await setStoreValue(req, mockResponse, mockNext);
      expect(aStoreService.set).toHaveBeenCalledWith(
        payload.key,
        payload.value,
        payload.ttl,
      );
    });

    it('should send response with status code 201 and success message', async () => {
      await setStoreValue(req, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledTimes(1);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Value successfully added to the store!',
      });
    });
  });

  describe('getStoreValue', () => {
    let req: GetStoreValueRequest;

    const key = 'k1';
    const value = 'v1';

    beforeEach(() => {
      req = {} as GetStoreValueRequest;
      req.params = { key };
    });

    it('should call store service', async () => {
      await getStoreValue(req, mockResponse, mockNext);
      expect(aStoreService.get).toHaveBeenCalledWith(key);
    });

    describe('when there is no value for the provided key', () => {
      it('should send response with status code 404 and send message', async () => {
        await getStoreValue(req, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith({
          message: `No value found for key '${key}' in the store`,
        });
      });
    });

    describe('when there is value for the provided key', () => {
      beforeEach(() => {
        aStoreService.get.mockReturnValueOnce(value);
      });

      it('should send response with status code 200 and send value', async () => {
        await getStoreValue(req, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith({ value });
      });
    });
  });

  describe('deleteStoreValue', () => {
    let req: DeleteStoreValueRequest;

    const key = 'k1';
    const value = 'v1';

    beforeEach(() => {
      req = {} as GetStoreValueRequest;
      req.params = { key };
    });

    describe('when there is no value for the provided key', () => {
      it('should call store service to get value', async () => {
        await deleteStoreValue(req, mockResponse, mockNext);
        expect(aStoreService.get).toHaveBeenCalledWith(key);
      });

      it('should not call store service to delete value', async () => {
        await deleteStoreValue(req, mockResponse, mockNext);
        expect(aStoreService.delete).not.toHaveBeenCalled();
      });

      it('should send response with status code 404 and send message', async () => {
        await deleteStoreValue(req, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith({
          message: `No value found for key '${key}' in the store`,
        });
      });
    });

    describe('when there is value for the provided key', () => {
      beforeEach(() => {
        aStoreService.get.mockReturnValueOnce(value);
      });

      it('should call store service to get value', async () => {
        await deleteStoreValue(req, mockResponse, mockNext);
        expect(aStoreService.get).toHaveBeenCalledWith(key);
      });

      it('should call store service to delete value', async () => {
        await deleteStoreValue(req, mockResponse, mockNext);
        expect(aStoreService.delete).toHaveBeenCalledWith(key);
      });

      it('should send response with status code 200 and send message', async () => {
        await deleteStoreValue(req, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith({
          message: `Value '${value}' successfully deleted from the store`,
        });
      });
    });
  });
});
