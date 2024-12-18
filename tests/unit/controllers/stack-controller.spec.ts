import { aStackService } from '@tests/mocks/stack.service';
jest.mock('@/services/stack.service', () => ({
  stackService: aStackService,
}));

import {
  addStackItem,
  getStackItem,
  AddStackItemRequest,
} from '@/controllers/stack.controller';
import { mockNext, mockRequest, mockResponse } from '@tests/mocks/express-api';

const TEST_ITEM = 'item1';

describe('@controllers/stack-controller', () => {
  afterEach(jest.clearAllMocks);

  describe('addStackItem', () => {
    let req: AddStackItemRequest;

    beforeEach(() => {
      req = {} as AddStackItemRequest;
      req.body = { item: TEST_ITEM };
    });

    it('should call stack service', async () => {
      await addStackItem(req, mockResponse, mockNext);
      expect(aStackService.addItem).toHaveBeenCalledWith(TEST_ITEM);
    });

    it('should send response with status code 201 and success message', async () => {
      await addStackItem(req, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledTimes(1);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Item successfully added to the stack!',
      });
    });
  });

  describe('getItem', () => {
    it('should call stack service', async () => {
      await getStackItem(mockRequest, mockResponse, mockNext);
      expect(aStackService.removeItem).toHaveBeenCalled();
    });

    describe('when there is no item in the stack', () => {
      it('should send response with status code 404 and send message', async () => {
        await getStackItem(mockRequest, mockResponse, mockNext);
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
        await getStackItem(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith({
          item: TEST_ITEM,
        });
      });
    });
  });
});
