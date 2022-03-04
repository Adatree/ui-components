import { CreateConsent, ConsentResponse, PostUsageAction, Status } from '../../../generated/consent/api';
import { dataHolder } from './data-holders';
import { useCase } from './use-cases';

const createConsent = (): CreateConsent => {
  return {
    consumerEmail: 'shane+test@adatree.com.au',
    sharingEndDate: new Date().toISOString(),
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    useCaseId: useCase.homeLoan().id,
    postUsageAction: PostUsageAction.DEIDENTIFICATION,
    directMarketingAllowed: true,
  };
};

const active = (): ConsentResponse => {
  return {
    consentId: 'abc8d9c3-6527-4349-a8fb-d1f7f90f225d',
    cdrArrangementId: '8e228588-5821-4a6f-8b39-fb9c346e2158',
    consumerId: '2',
    status: Status.ACTIVE,
    created: new Date(2020, 10, 25).toISOString(),
    consumerEmail: 'shane+test@adatree.com.au',
    sharingEndDate: new Date(2021, 10, 2).toISOString(),
    dataHolderName: dataHolder.yellowBank().brandName,
    dataHolderBrandId: dataHolder.yellowBank().dataHolderBrandId,
    useCase: useCase.homeLoan(),
    postUsageAction: PostUsageAction.DELETION,
    directMarketingAllowed: false,
  };
};

const revoked = (): ConsentResponse => {
  return {
    consentId: 'f328b2fb-441e-951d-2f9e-2296af82cae1',
    cdrArrangementId: '6effe328-c468-4b58-b74e-7670aa64ce5b',
    consumerId: '2',
    status: Status.REVOKED,
    created: new Date(2019, 10, 1).toISOString(),
    sharingEndDate: '2020-12-18T10:20:21.889Z',
    firstDataCollection: new Date(2019, 10, 2).toISOString(),
    consumerEmail: 'shane+test@adatree.com.au',
    revoked: new Date(2020, 11, 6).toISOString(),
    dataHolderName: dataHolder.redBank().brandName,
    dataHolderBrandId: dataHolder.redBank().dataHolderBrandId,
    useCase: useCase.ongoingConsentMinScopes(),
    postUsageAction: PostUsageAction.DELETION,
    directMarketingAllowed: false,
  };
};

const requested = (): ConsentResponse => {
  return {
    version: undefined,
    created: '2021-01-05T12:52:25.446231Z',
    firstDataCollection: undefined,
    revoked: undefined,
    lastNotificationSentAt: undefined,
    status: Status.REQUESTED,
    sharingEndDate: '2021-01-05T12:52:09.804Z',
    consumerEmail: 'john+sample@adatree.com.au',
    dataHolderName: dataHolder.redBank().brandName,
    dataHolderBrandId: dataHolder.redBank().dataHolderBrandId,
    useCase: useCase.homeLoan(),
    postUsageAction: PostUsageAction.DELETION,
    consumerId: 'auth0|5f899e393c3f960069a81555',
    consentId: 'b89ce648-1589-470c-8829-9955379fc5fc',
    cdrArrangementId: 'a40de7e6-8439-4ad4-a8cc-9a84f6d0fb5e',
    directMarketingAllowed: false,
  };
};

const expired = (): ConsentResponse => {
  return {
    version: undefined,
    created: '2020-12-18T10:20:40.123664Z',
    firstDataCollection: '2020-12-18T10:21:40.123664Z',
    revoked: undefined,
    lastNotificationSentAt: undefined,
    status: Status.EXPIRED,
    sharingEndDate: '2020-12-18T10:20:21.889Z',
    consumerEmail: 'john+sample@adatree.com.au',
    dataHolderName: dataHolder.yellowBank().brandName,
    dataHolderBrandId: dataHolder.yellowBank().dataHolderBrandId,
    useCase: useCase.onceOffConsentMinScopes(),
    postUsageAction: PostUsageAction.DEIDENTIFICATION,
    consumerId: 'auth0|5f899e393c3f960069a81555',
    consentId: '6e485649-3113-468d-8067-5f18580476f6',
    cdrArrangementId: 'd498ec89-a1e2-43c2-ab7c-38a6e5db5a24',
    directMarketingAllowed: false,
  };
};

const all = (): ConsentResponse[] => {
  return [
    active(),
    revoked(),
    requested(),
    expired(),
    {
      consentId: '3ad2f7ce-18f4-451f-afb6-0077b339ddb4',
      cdrArrangementId: 'a2295dc3-fa81-456f-b1e4-8d57615109b4',
      consumerId: '2',
      status: Status.ACTIVE,
      created: new Date(2020, 10, 1).toISOString(),
      firstDataCollection: new Date(2020, 10, 2).toISOString(),
      consumerEmail: 'shane+test@adatree.com.au',
      dataHolderName: dataHolder.redBank().brandName,
      dataHolderBrandId: dataHolder.redBank().dataHolderBrandId,
      useCase: useCase.onceOffConsentMinScopes(),
      postUsageAction: PostUsageAction.DELETION,
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
      dataHolderName: dataHolder.redBank().brandName,
      dataHolderBrandId: dataHolder.redBank().dataHolderBrandId,
      useCase: useCase.openEnergy(),
      postUsageAction: PostUsageAction.DEIDENTIFICATION,
      consumerId: 'auth0|5f899e393c3f960069a81555',
      consentId: '550b2d5a-2c52-4213-a9eb-3abe467d99a9',
      cdrArrangementId: 'c96b48d7-67ef-4752-8231-9816e9027681',
      directMarketingAllowed: false,
    },
  ];
};

const generateConsent = (createConsent: CreateConsent): ConsentResponse => {
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
    dataHolderBrandId: createConsent.dataHolderBrandId,
    postUsageAction: createConsent.postUsageAction,
    directMarketingAllowed: createConsent.directMarketingAllowed,
  };
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

export const consent = {
  all,
  active,
  expired,
  requested,
  revoked,
  createConsent,
  generateConsent,
};