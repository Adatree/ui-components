// tslint:disable:no-console
import { logger } from './logger';

describe('Logger Utils', () => {
  console.info = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
  console.debug = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('debug');
  });

  it('should log types correctly', () => {
    localStorage.setItem('debug', 'debug');

    const expectedMessage = 'Test';
    const data1 = { new: 'work' };
    const data2 = { test: 'done' };
    const data3 = { some: 'thing' };

    logger.info(expectedMessage, data1, data2);
    expect(console.info).toHaveBeenCalledWith(expectedMessage, data1, data2);

    logger.warn(expectedMessage, data3);
    expect(console.warn).toHaveBeenCalledWith(expectedMessage, data3);

    logger.error(expectedMessage, data3);
    expect(console.error).toHaveBeenCalledWith(expectedMessage, data3);

    // logger.debug(expectedMessage, data3);
    // expect(console.debug).toHaveBeenCalledWith(expectedMessage, data3);
  });
});
