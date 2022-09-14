import { Logger } from '../logger/logger';
import { bankData } from './test-data/bank-transactions';
import { consent } from './test-data/consents';
import { dataHolder } from './test-data/data-holders';
import { dataRecipient } from './test-data/data-recipient';
import { outsourcedServiceProvider } from './test-data/outsourced-service-providers';
import { scope } from './test-data/scopes';
import { trustedAdvisor } from './test-data/trusted-advisors';
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
    consent,
    dataHolder,
    dataRecipient,
    outsourcedServiceProvider,
    scope,
    trustedAdvisor,
    useCase,
  },
  suspendLogger,
};
