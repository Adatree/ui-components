const adatree = () => {
  return {
    id: 1,
    name: 'Adatree',
    accreditedId: '1234567890',
    service:
      "They'll collect and analyse your data on our behalf. They delete your data as soon as they have provided this service on our behalf.",
    cdrPolicyUrl: 'https://example.com',
  };
};

const outsourcedServiceProvider1 = () => {
  return {
    id: 2,
    name: 'OSP 1',
    accreditedId: '1234567890',
    service:
      "They'll collect and analyse your data on our behalf. They delete your data as soon as they have provided this service on our behalf.",
    cdrPolicyUrl: 'https://example.com',
  };
};

const outsourcedServiceProvider2 = () => {
  return {
    id: 3,
    name: 'OSP 2',
    accreditedId: '1234567890',
    service:
      "They'll collect and analyse your data on our behalf. They delete your data as soon as they have provided this service on our behalf.",
    cdrPolicyUrl: 'https://example.com',
  };
};

const all = () => {
  return [adatree(), outsourcedServiceProvider1(), outsourcedServiceProvider2()];
};

export const outsourcedServiceProvider = {
  all,
  adatree,
  outsourcedServiceProvider1,
  outsourcedServiceProvider2,
};