import { TrustedAdvisorResponse } from '../../../types/trusted-advisor.type';

const trustedAdvisor1 = (): TrustedAdvisorResponse => {
  return {
    dataPolicyUrl: 'https://example.com/trusted-advisor-1-data-policy',
    description: 'This is Trusted Advisor 1 and they provide the service X.',
    id: 'TA1',
    name: 'Trusted Advisor 1',
    protectionFrameworkUrl: 'https://example.com/trusted-advisor-1-protection-framework',
  };
};

const trustedAdvisor2 = (): TrustedAdvisorResponse => {
  return {
    dataPolicyUrl: 'https://example.com/trusted-advisor-2-data-policy',
    description: 'This is Trusted Advisor 2 and they provide the service X.',
    id: 'TA2',
    name: 'Trusted Advisor 2',
    protectionFrameworkUrl: 'https://example.com/trusted-advisor-2-protection-framework',
  };
};

const trustedAdvisor3 = (): TrustedAdvisorResponse => {
  return {
    dataPolicyUrl: 'https://example.com/trusted-advisor-3-data-policy',
    description: 'This is Trusted Advisor 3 and they provide the service X.',
    id: 'TA3',
    name: 'Trusted Advisor 3',
    protectionFrameworkUrl: 'https://example.com/trusted-advisor-3-protection-framework',
  };
};

const all = (): TrustedAdvisorResponse[] => [trustedAdvisor1(), trustedAdvisor2(), trustedAdvisor3()];

export const trustedAdvisor = {
  all,
  trustedAdvisor1,
  trustedAdvisor2,
  trustedAdvisor3,
};
