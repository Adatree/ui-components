import { logger } from '../logger/logger';

const suspendLogger = (): void => {
  logger.debug = jest.fn();
  logger.info = jest.fn();
  logger.warn = jest.fn();
  logger.error = jest.fn();
};

export const TestUtil = {
  suspendLogger,
};
