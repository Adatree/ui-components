import { Logger } from '../logger/logger';
import { consent } from './test-data/consents';
import { dataHolder } from './test-data/data-holders';
import { outsourcedServiceProvider } from './test-data/outsourced-service-providers';
import { scope } from './test-data/scopes';
import { useCase } from './test-data/use-cases';

const suspendLogger = (): void => {
  Logger.debug = jest.fn();
  Logger.info = jest.fn();
  Logger.warn = jest.fn();
  Logger.error = jest.fn();
};

export const TestUtil = {
  testData: {
    consent,
    dataHolder,
    outsourcedServiceProvider,
    scope,
    useCase,
  },
  suspendLogger,
};
