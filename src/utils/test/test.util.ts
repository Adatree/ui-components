import { Logger } from '../logger/logger';
import { bankData } from './test-data/bank-transactions';
import { consent } from './test-data/consents';
import { consentV2 } from './test-data/consents-v2';
import { dataHolder } from './test-data/data-holders';
import { dataRecipient } from './test-data/data-recipient';
import { outsourcedServiceProvider } from './test-data/outsourced-service-providers';
import { scope } from './test-data/scopes';
import { useCase } from './test-data/use-cases';
import { useCaseV2 } from './test-data/use-cases-v2';

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
    consentV2,
    dataHolder,
    dataRecipient,
    outsourcedServiceProvider,
    scope,
    useCase,
    useCaseV2,
  },
  suspendLogger,
};
