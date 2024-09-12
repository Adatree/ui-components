import { OutsourcedServiceProvider } from '@adatree/react-api-sdk';

const adatree = (): OutsourcedServiceProvider => {
  return {
    providerName: 'Adatree',
    accreditationId: '1234567890',
    serviceDescription:
      "They'll collect and analyse your data on our behalf. They delete your data as soon as they have provided this service on our behalf.",
    cdrPolicyUri: 'https://example.com',
  };
};

const outsourcedServiceProvider1 = (): OutsourcedServiceProvider => {
  return {
    providerName: 'OSP 1',
    accreditationId: '1234567890',
    serviceDescription:
      "They'll collect and analyse your data on our behalf. They delete your data as soon as they have provided this service on our behalf.",
    cdrPolicyUri: 'https://example.com',
  };
};

const outsourcedServiceProvider2 = (): OutsourcedServiceProvider => {
  return {
    providerName: 'OSP 2',
    accreditationId: '1234567890',
    serviceDescription:
      "They'll collect and analyse your data on our behalf. They delete your data as soon as they have provided this service on our behalf.",
    cdrPolicyUri: 'https://example.com',
  };
};

const all = (): OutsourcedServiceProvider[] => {
  return [adatree(), outsourcedServiceProvider1(), outsourcedServiceProvider2()];
};

export const outsourcedServiceProvider = {
  all,
  adatree,
  outsourcedServiceProvider1,
  outsourcedServiceProvider2,
};
