import { ConsentApi } from '@adatree/react-api-sdk';
import { CreateConsent, PostUsageAction, Status } from '../../../generated/consent/api';
import { dataHolder } from './data-holders';
import { useCaseV2 } from './use-cases-v2';

type ConsentResponse = ConsentApi.ConsentResponse;
const createConsent = (): CreateConsent => {
  let useCaseId = useCaseV2.homeLoan().id;

  if (!useCaseId) {
    useCaseId = '';
  }

  return {
    consumerEmail: 'shane+test@adatree.com.au',
    sharingEndDate: new Date().toISOString(),
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    useCaseId: useCaseId,
    postUsageAction: PostUsageAction.DeIdentification,
    directMarketingAllowed: true,
  };
};

const active = (): ConsentResponse => {
  return {
    consentId: 'abc8d9c3-6527-4349-a8fb-d1f7f90f225d',
    cdrArrangementId: '8e228588-5821-4a6f-8b39-fb9c346e2158',
    consumerId: '2',
    status: Status.Active,
    created: new Date(2020, 10, 25).toISOString(),
    consumerEmail: 'shane+test@adatree.com.au',
    sharingEndDate: new Date(2023, 10, 2).toISOString(),
    dataHolderName: dataHolder.yellowBank().brandName,
    dataHolderBrandId: dataHolder.yellowBank().dataHolderBrandId,
    dataHolderLogoUri: dataHolder.yellowBank().logoUri,
    useCase: useCaseV2.homeLoan(),
    postUsageAction: PostUsageAction.Deletion,
    directMarketingAllowed: false,
  };
};

const activeWithConsumerTypeOrganisation = (): ConsentResponse => {
  return {
    ...active(),
    consentId: 'fed8d9c3-6527-4349-a8fb-d1f7f90f225d',
    useCase: useCaseV2.consumerTypeOrg(),
  };
};

const activeWithGrantee = (): ConsentResponse => {
  return {
    ...active(),
    grantee: { name: 'Nick the Broker', licenceNumber: '000999' },
  };
};

const activeWithDeIdentification = (): ConsentResponse => {
  return {
    ...active(),
    postUsageAction: PostUsageAction.DeIdentification,
  };
};

const revoked = (): ConsentResponse => {
  return {
    consentId: 'f328b2fb-441e-951d-2f9e-2296af82cae1',
    cdrArrangementId: '6effe328-c468-4b58-b74e-7670aa64ce5b',
    consumerId: '2',
    status: Status.Revoked,
    created: new Date(2019, 10, 1).toISOString(),
    sharingEndDate: '2020-12-18T10:20:21.889Z',
    firstDataCollection: new Date(2019, 10, 2).toISOString(),
    consumerEmail: 'shane+test@adatree.com.au',
    revoked: new Date(2020, 11, 6).toISOString(),
    dataHolderName: dataHolder.redBank().brandName,
    dataHolderBrandId: dataHolder.redBank().dataHolderBrandId,
    dataHolderLogoUri: dataHolder.redBank().logoUri,
    useCase: useCaseV2.ongoingConsentMinScopes(),
    postUsageAction: PostUsageAction.Deletion,
    directMarketingAllowed: false,
  };
};

const revokedWithGrantee = (): ConsentResponse => {
  return {
    ...revoked(),
    grantee: { name: 'Nick the Broker', licenceNumber: '000999' },
  };
};

const requested = (): ConsentResponse => {
  return {
    version: undefined,
    created: '2021-01-05T12:52:25.446231Z',
    firstDataCollection: undefined,
    revoked: undefined,
    lastNotificationSentAt: undefined,
    status: Status.Requested,
    sharingEndDate: '2021-01-05T12:52:09.804Z',
    consumerEmail: 'john+sample@adatree.com.au',
    dataHolderName: dataHolder.redBank().brandName,
    dataHolderBrandId: dataHolder.redBank().dataHolderBrandId,
    dataHolderLogoUri: dataHolder.redBank().logoUri,
    useCase: useCaseV2.homeLoan(),
    postUsageAction: PostUsageAction.Deletion,
    consumerId: 'auth0|5f899e393c3f960069a81555',
    consentId: 'b89ce648-1589-470c-8829-9955379fc5fc',
    cdrArrangementId: 'a40de7e6-8439-4ad4-a8cc-9a84f6d0fb5e',
    directMarketingAllowed: false,
  };
};

const requestedWithGrantee = (): ConsentResponse => {
  return {
    ...requested(),
    grantee: { name: 'Nick the Broker', licenceNumber: '000999' },
  };
};

const expired = (): ConsentResponse => {
  return {
    version: undefined,
    created: '2020-12-18T10:20:40.123664Z',
    firstDataCollection: '2020-12-18T10:21:40.123664Z',
    revoked: undefined,
    lastNotificationSentAt: undefined,
    status: Status.Expired,
    sharingEndDate: '2020-12-18T10:20:21.889Z',
    consumerEmail: 'john+sample@adatree.com.au',
    dataHolderName: dataHolder.yellowBank().brandName,
    dataHolderBrandId: dataHolder.yellowBank().dataHolderBrandId,
    dataHolderLogoUri: dataHolder.yellowBank().logoUri,
    useCase: useCaseV2.onceOffConsentMinScopes(),
    postUsageAction: PostUsageAction.DeIdentification,
    consumerId: 'auth0|5f899e393c3f960069a81555',
    consentId: '6e485649-3113-468d-8067-5f18580476f6',
    cdrArrangementId: 'd498ec89-a1e2-43c2-ab7c-38a6e5db5a24',
    directMarketingAllowed: false,
  };
};

const expiredWithGrantee = (): ConsentResponse => {
  return {
    ...expired(),
    grantee: { name: 'Nick the Broker', licenceNumber: '000999' },
  };
};
const all = (): ConsentResponse[] => {
  return [
    active(),
    activeWithConsumerTypeOrganisation(),
    activeWithDeIdentification(),
    activeWithGrantee(),
    revoked(),
    requested(),
    expired(),
    {
      consentId: '3ad2f7ce-18f4-451f-afb6-0077b339ddb4',
      cdrArrangementId: 'a2295dc3-fa81-456f-b1e4-8d57615109b4',
      consumerId: '2',
      status: Status.Active,
      created: new Date(2020, 10, 1).toISOString(),
      firstDataCollection: new Date(2020, 10, 2).toISOString(),
      consumerEmail: 'shane+test@adatree.com.au',
      dataHolderName: dataHolder.redBank().brandName,
      dataHolderBrandId: dataHolder.redBank().dataHolderBrandId,
      dataHolderLogoUri: dataHolder.redBank().logoUri,
      useCase: useCaseV2.onceOffConsentMinScopes(),
      postUsageAction: PostUsageAction.Deletion,
      directMarketingAllowed: false,
    },
    {
      version: undefined,
      created: '2020-12-18T10:52:14.35377Z',
      firstDataCollection: '2020-12-18T10:55:14.35377Z',
      revoked: '2020-12-18T10:58:35.25313Z',
      lastNotificationSentAt: undefined,
      status: Status.Revoked,
      sharingEndDate: '2020-12-23T10:51:00Z',
      consumerEmail: 'john+sample@adatree.com.au',
      dataHolderName: dataHolder.redBank().brandName,
      dataHolderBrandId: dataHolder.redBank().dataHolderBrandId,
      dataHolderLogoUri: dataHolder.redBank().logoUri,
      useCase: useCaseV2.openEnergy(),
      postUsageAction: PostUsageAction.DeIdentification,
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
    status: Status.Active,
    created: new Date().toISOString(),
    firstDataCollection: new Date().toISOString(),
    useCase: { ...useCaseV2.homeLoan(), id: createConsent.useCaseId },
    consumerEmail: createConsent.consumerEmail,
    sharingEndDate: createConsent.sharingEndDate,
    dataHolderBrandId: createConsent.dataHolderBrandId,
    dataHolderLogoUri: dataHolder.yellowBank().logoUri,
    postUsageAction: createConsent.postUsageAction,
    directMarketingAllowed: createConsent.directMarketingAllowed,
  };
};

const getTestUuidV4 = () => {
  const getRandomSymbol = (symbol: string) => {
    let array;

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

export const consentV2 = {
  all,
  active,
  activeWithConsumerTypeOrganisation,
  activeWithDeIdentification,
  activeWithGrantee,
  expiredWithGrantee,
  requestedWithGrantee,
  revokedWithGrantee,
  expired,
  requested,
  revoked,
  createConsent,
  generateConsent,
};
