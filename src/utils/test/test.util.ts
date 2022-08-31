import { Logger } from '../logger/logger';
import { bankData } from './test-data/bank-transactions';
import { consent } from './test-data/consents';
import { copy } from './test-data/copy';
import { dataHolder } from './test-data/data-holders';
import { organisation } from './test-data/organisation';
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
    bankData,
    copy,
    consent,
    dataHolder,
    organisation,
    outsourcedServiceProvider,
    scope,
    useCase,
  },
  suspendLogger,
};
