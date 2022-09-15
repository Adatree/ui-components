import { DataHandler } from '../../../types/data-handler.type';

const trustedAdvisor1 = (): DataHandler => {
  return {
    dataPolicyUrl: 'https://example.com/trusted-advisor-1-data-policy',
    description: 'This is Trusted Advisor 1 and they provide the service X.',
    id: 'TA1',
    name: 'Trusted Advisor 1',
    protectionFrameworkUrl: 'https://example.com/trusted-advisor-1-protection-framework',
  };
};

const trustedAdvisor2 = (): DataHandler => {
  return {
    dataPolicyUrl: 'https://example.com/trusted-advisor-2-data-policy',
    description: 'This is Trusted Advisor 2 and they provide the service X.',
    id: 'TA2',
    name: 'Trusted Advisor 2',
    protectionFrameworkUrl: 'https://example.com/trusted-advisor-2-protection-framework',
  };
};

const trustedAdvisor3 = (): DataHandler => {
  return {
    dataPolicyUrl: 'https://example.com/trusted-advisor-3-data-policy',
    description: 'This is Trusted Advisor 3 and they provide the service X.',
    id: 'TA3',
    name: 'Trusted Advisor 3',
    protectionFrameworkUrl: 'https://example.com/trusted-advisor-3-protection-framework',
  };
};

const all = (): DataHandler[] => [trustedAdvisor1(), trustedAdvisor2(), trustedAdvisor3()];

export const trustedAdvisor = {
  all,
  trustedAdvisor1,
  trustedAdvisor2,
  trustedAdvisor3,
};
