import { TrustedAdvisorResponse } from '../../../types/trusted-advisor.type';

const trustedAdvisor1 = (): TrustedAdvisorResponse => {
  return {
    description: 'This is Trusted Advisor 1 and they provide the service X.',
    id: 'TA1',
    name: 'Trusted Advisor 1',
  };
};

const trustedAdvisor2 = (): TrustedAdvisorResponse => {
  return {
    description: 'This is Trusted Advisor 2 and they provide the service X.',
    id: 'TA2',
    name: 'Trusted Advisor 2',
  };
};

const trustedAdvisor3 = (): TrustedAdvisorResponse => {
  return {
    description: 'This is Trusted Advisor 3 and they provide the service X.',
    id: 'TA3',
    name: 'Trusted Advisor 3',
  };
};

const all = (): TrustedAdvisorResponse[] => [trustedAdvisor1(), trustedAdvisor2(), trustedAdvisor3()];

export const trustedAdvisor = {
  all,
  trustedAdvisor1,
  trustedAdvisor2,
  trustedAdvisor3,
};
