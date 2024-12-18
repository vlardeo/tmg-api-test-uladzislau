import { aStackService } from '@tests/mocks/stack.service';
jest.mock('@/services/stack.service', () => ({
  stackService: aStackService,
}));

import {
  addItem,
  AddItemRequest,
  getItem,
} from '@/controllers/stack.controller';
import { mockNext, mockRequest, mockResponse } from '@tests/mocks/express-api';

const TEST_ITEM = 'item1';

describe('@controllers/stack-controller', () => {
  afterEach(jest.clearAllMocks);

  describe('addItem', () => {
    let req: AddItemRequest;

    beforeEach(() => {
      req = {} as AddItemRequest;
      req.body = { item: TEST_ITEM };
    });

    it('should call stack service', async () => {
      await addItem(req, mockResponse, mockNext);
      expect(aStackService.addItem).toHaveBeenCalledWith(TEST_ITEM);
    });

    it('should send response with status code 201 and success message', async () => {
      await addItem(req, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledTimes(1);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Item successfully added to the stack!',
      });
    });
  });

  describe('getItem', () => {
    it('should call stack service', async () => {
      await getItem(mockRequest, mockResponse, mockNext);
      expect(aStackService.removeItem).toHaveBeenCalled();
    });

    describe('when there is no item in the stack', () => {
      it('should send response with status code 404 and send message', async () => {
        await getItem(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith({
          message: 'No items in the stack',
        });
      });
    });

    describe('when there are items in the stack', () => {
      beforeEach(() => {
        aStackService.removeItem.mockReturnValueOnce(TEST_ITEM);
      });

      it('should send response with status code 200 and send item', async () => {
        await getItem(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith({
          item: TEST_ITEM,
        });
      });
    });
  });
});
