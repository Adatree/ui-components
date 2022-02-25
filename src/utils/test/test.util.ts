import { Logger } from '../logger/logger';
import {
  ConsentResponse,
  Status,
  AccessFrequency,
  PostUsageAction,
  CreateConsent,
  ScopeResponse,
} from '../../generated/consent/api';
import { UseCaseResponse } from '../../generated/consent/api';
import { DataHolder } from '../../generated/dcr/api';
import { DateDuration } from '../../atoms/date-button/date-button.atom';

const suspendLogger = (): void => {
  Logger.debug = jest.fn();
  Logger.info = jest.fn();
  Logger.warn = jest.fn();
  Logger.error = jest.fn();
};

// Scope
const getTestDataPersonalInformationScope = (): ScopeResponse => {
  return {
    name: 'Personal information',
    id: 'common:customer.basic:read',
    description: 'This will allow us to access your personally identifiable information',
    claims: ['Name', 'Occupation'],
    required: true,
    priority: 1,
  };
};

const getTestDataBankAccountScope = (): ScopeResponse => {
  return {
    name: 'Bank account name, type and balance',
    id: 'bank:accounts.basic:read',
    description: 'This will allow us to access basic information about your accounts',
    claims: ['Name of account', 'Type of account', 'Account balance'],
    required: true,
    priority: 2,
  };
};

const getTestDataScopeResponse = (): ScopeResponse[] => {
  return [getTestDataPersonalInformationScope(), getTestDataBankAccountScope()];
};

const getTestDataHomeUseCase = (): UseCaseResponse => {
  return {
    id: 'HOME_LOAN',
    name: 'Home Loan Assessment',
    description: 'Data will be used to assess your eligibility for a home loan.',
    priority: 1,
    accessFrequency: AccessFrequency.ONGOING,
    scopes: getTestDataScopeResponse(),
  };
};

// Use Case
const getTestDataBudgetingToolUseCase = (): UseCaseResponse => {
  return {
    id: 'BUDGETING_TOOL',
    name: 'Budgeting Tool',
    description: 'Data will be used to help you with your budget.',
    priority: 2,
    accessFrequency: AccessFrequency.ONCEOFF,
    scopes: [getTestDataBankAccountScope()],
  };
};

// Consent
const getTestDataCreateConsent = (): CreateConsent => {
  return {
    consumerEmail: 'shane+test@adatree.com.au',
    sharingEndDate: new Date().toISOString(),
    dataHolderName: 'Yellow Bank of Australia',
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    useCaseId: getTestDataHomeUseCase().id,
    postUsageAction: PostUsageAction.DEIDENTIFICATION,
    directMarketingAllowed: true,
  };
};

const getTestDataConsentResponse = (): ConsentResponse => {
  return {
    consentId: 'abc8d9c3-6527-4349-a8fb-d1f7f90f225d',
    cdrArrangementId: '8e228588-5821-4a6f-8b39-fb9c346e2158',
    consumerId: '2',
    status: Status.ACTIVE,
    created: new Date(2020, 10, 25).toISOString(),
    consumerEmail: 'shane+test@adatree.com.au',
    sharingEndDate: new Date(2021, 10, 2).toISOString(),
    dataHolderName: 'Yellow Bank of Australia',
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    useCase: getTestDataHomeUseCase(),
    postUsageAction: PostUsageAction.DELETION,
    directMarketingAllowed: false,
  };
};

const getTestDataConsentResponses = (): ConsentResponse[] => {
  return [
    getTestDataConsentResponse(),
    {
      consentId: '3ad2f7ce-18f4-451f-afb6-0077b339ddb4',
      cdrArrangementId: 'a2295dc3-fa81-456f-b1e4-8d57615109b4',
      consumerId: '2',
      status: Status.ACTIVE,
      created: new Date(2020, 10, 1).toISOString(),
      firstDataCollection: new Date(2020, 10, 2).toISOString(),
      consumerEmail: 'shane+test@adatree.com.au',
      dataHolderName: 'Red Australia Bank',
      dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
      useCase: getTestDataBudgetingToolUseCase(),
      postUsageAction: PostUsageAction.DELETION,
      directMarketingAllowed: false,
    },
    {
      consentId: 'f328b2fb-441e-951d-2f9e-2296af82cae1',
      cdrArrangementId: '6effe328-c468-4b58-b74e-7670aa64ce5b',
      consumerId: '2',
      status: Status.REVOKED,
      created: new Date(2019, 10, 1).toISOString(),
      sharingEndDate: '2020-12-18T10:20:21.889Z',
      firstDataCollection: new Date(2019, 10, 2).toISOString(),
      consumerEmail: 'shane+test@adatree.com.au',
      revoked: new Date(2020, 11, 6).toISOString(),
      dataHolderName: 'Red Australia Bank',
      dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
      useCase: {
        ...getTestDataBudgetingToolUseCase(),
        accessFrequency: AccessFrequency.ONGOING,
      },
      postUsageAction: PostUsageAction.DELETION,
      directMarketingAllowed: false,
    },
    {
      version: undefined,
      created: '2021-01-05T12:52:25.446231Z',
      firstDataCollection: undefined,
      revoked: undefined,
      lastNotificationSentAt: undefined,
      status: Status.REQUESTED,
      sharingEndDate: '2021-01-05T12:52:09.804Z',
      consumerEmail: 'john+sample@adatree.com.au',
      dataHolderName: 'Red Australia Bank',
      dataHolderBrandId: '7ddd80f1-82dc-4dfb-8b3f-7415f9691ac9',
      useCase: getTestDataHomeUseCase(),
      postUsageAction: PostUsageAction.DELETION,
      consumerId: 'auth0|5f899e393c3f960069a81555',
      consentId: 'b89ce648-1589-470c-8829-9955379fc5fc',
      cdrArrangementId: 'a40de7e6-8439-4ad4-a8cc-9a84f6d0fb5e',
      directMarketingAllowed: false,
    },
    {
      version: undefined,
      created: '2020-12-18T10:20:40.123664Z',
      firstDataCollection: '2020-12-18T10:21:40.123664Z',
      revoked: undefined,
      lastNotificationSentAt: undefined,
      status: Status.EXPIRED,
      sharingEndDate: '2020-12-18T10:20:21.889Z',
      consumerEmail: 'john+sample@adatree.com.au',
      dataHolderName: 'Red Australia Bank',
      dataHolderBrandId: '7ddd80f1-82dc-4dfb-8b3f-7415f9691ac9',
      useCase: getTestDataHomeUseCase(),
      postUsageAction: PostUsageAction.DEIDENTIFICATION,
      consumerId: 'auth0|5f899e393c3f960069a81555',
      consentId: '6e485649-3113-468d-8067-5f18580476f6',
      cdrArrangementId: 'd498ec89-a1e2-43c2-ab7c-38a6e5db5a24',
      directMarketingAllowed: false,
    },
    {
      version: undefined,
      created: '2020-12-18T10:52:14.35377Z',
      firstDataCollection: '2020-12-18T10:55:14.35377Z',
      revoked: '2020-12-18T10:58:35.25313Z',
      lastNotificationSentAt: undefined,
      status: Status.REVOKED,
      sharingEndDate: '2020-12-23T10:51:00Z',
      consumerEmail: 'john+sample@adatree.com.au',
      dataHolderName: 'Red Australia Bank',
      dataHolderBrandId: '7ddd80f1-82dc-4dfb-8b3f-7415f9691ac9',
      useCase: getTestDataHomeUseCase(),
      postUsageAction: PostUsageAction.DEIDENTIFICATION,
      consumerId: 'auth0|5f899e393c3f960069a81555',
      consentId: '550b2d5a-2c52-4213-a9eb-3abe467d99a9',
      cdrArrangementId: 'c96b48d7-67ef-4752-8231-9816e9027681',
      directMarketingAllowed: false,
    },
  ];
};

const generateTestDataConsent = (createConsent: CreateConsent): ConsentResponse => {
  return {
    consentId: getTestUuidV4(),
    cdrArrangementId: getTestUuidV4(),
    consumerId: '2',
    status: Status.ACTIVE,
    created: new Date().toISOString(),
    firstDataCollection: new Date().toISOString(),
    useCase: { id: createConsent.useCaseId },
    consumerEmail: createConsent.consumerEmail,
    sharingEndDate: createConsent.sharingEndDate,
    dataHolderName: createConsent.dataHolderName,
    dataHolderBrandId: createConsent.dataHolderBrandId,
    postUsageAction: createConsent.postUsageAction,
    directMarketingAllowed: createConsent.directMarketingAllowed,
  };
};

// Data Holder
const getTestDataYellowBankDataHolder = (): DataHolder => {
  return {
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Yellow Bank of Australia',
    logoUri: '',
  };
};

const getTestDataRedBankDataHolder = (): DataHolder => {
  return {
    dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
    brandName: 'Red Australia Bank',
    logoUri: '',
  };
};

const getTestDataAllDataHolders = (): DataHolder[] => {
  return [getTestDataRedBankDataHolder(), getTestDataYellowBankDataHolder()];
};

const getTestDataDateOptions = (): DateDuration[] => {
  return [
    { unit: 'd', value: 1 },
    { unit: 'd', value: 2 },
    { unit: 'w', value: 1 },
    { unit: 'w', value: 2 },
    { unit: 'm', value: 1 },
    { unit: 'm', value: 2 },
    { unit: 'y', value: 1 },
    { unit: 'y', value: 2 },
  ];
};

const getTestDataDateOptionsWithOptionalProperties = (): DateDuration[] => {
  return getTestDataDateOptions().map((option) => {
    return { ...option, isSelected: false };
  });
};

const getTestUuidV4 = () => {
  const getRandomSymbol = (symbol: string) => {
    var array;

    if (symbol === 'y') {
      array = ['8', '9', 'a', 'b'];
      return array[Math.floor(Math.random() * array.length)];
    }

    array = new Uint8Array(1);
    window.crypto.getRandomValues(array);
    return (array[0] % 16).toString(16);
  };

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, getRandomSymbol);
};

export const TestUtil = {
  generateTestDataConsent,
  getTestDataAllDataHolders,
  getTestDataBankAccountScope,
  getTestDataBudgetingToolUseCase,
  getTestDataConsentResponse,
  getTestDataConsentResponses,
  getTestDataCreateConsent,
  getTestDataDateOptions,
  getTestDataDateOptionsWithOptionalProperties,
  getTestDataHomeUseCase,
  getTestDataPersonalInformationScope,
  getTestDataRedBankDataHolder,
  getTestDataScopeResponse,
  getTestDataYellowBankDataHolder,
  suspendLogger,
};
