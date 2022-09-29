import { DataRecipient, DataRecipientType } from '../../../types/data-recipient.type';

export const accreditedDataRecipient = (): DataRecipient => {
  return {
    complaintEmail: 'adr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/adr-cdr-policy',
    dataPolicyUrl: 'https://www.example.com/adr-data-policy',
    dataSharingRevocationEmail: 'adr.data.sharing.revocation@example.com',
    description: 'This is an Accredited Data Recipient and they provide the service X.',
    logo: '/assets/images/adr-test-company-logo.png',
    name: 'Accredited Company',
    protectionFrameworkUrl: 'https://www.example.com/adr-protection-framework',
    type: DataRecipientType.ACCREDITED_DATA_RECIPIENT,
  };
};

export const cdrRepresentative = (): DataRecipient => {
  return {
    complaintEmail: 'cdrr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/cdrr-cdr-policy',
    dataPolicyUrl: 'https://www.example.com/cdrr-data-policy',
    dataSharingRevocationEmail: 'cdrr.data.sharing.revocation@example.com',
    description: 'This is a CDR representative and they provide the service X.',
    logo: '/assets/images/cdrr-test-company-logo.png',
    name: 'CDR Representative Company',
    protectionFrameworkUrl: 'https://www.example.com/cdrr-protection-framework',
    type: DataRecipientType.CDR_REPRESENTATIVE,
  };
};

export const trustedAdvisor = (): DataRecipient => {
  return {
    complaintEmail: 'ta-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/ta-cdr-policy',
    dataPolicyUrl: 'https://www.example.com/ta-data-policy',
    dataSharingRevocationEmail: 'ta-data.sharing.revocation@example.com',
    description: 'This is a Trusted Adviser and they provide the service X.',
    logo: '/assets/images/ta-test-company-logo.png',
    name: 'Trusted Advisor Company',
    protectionFrameworkUrl: 'https://www.example.com/ta-protection-framework',
    type: DataRecipientType.TRUSTED_ADVISER,
  };
};

export const trustedAdvisorServiceProvider = (): DataRecipient => {
  return {
    complaintEmail: 'tasp-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/tasp-cdr-policy',
    dataPolicyUrl: 'https://www.example.com/tasp-data-policy',
    dataSharingRevocationEmail: 'tasp-data.sharing.revocation@example.com',
    description: 'This is a Trusted Adviser Service Provider and they provide the service X.',
    logo: '/assets/images/tasp-test-company-logo.png',
    name: 'Trusted Advisor Service Provider Company',
    protectionFrameworkUrl: 'https://www.example.com/tasp-protection-framework',
    type: DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER,
  };
};

const all = (): DataRecipient[] => {
  return [accreditedDataRecipient(), cdrRepresentative(), trustedAdvisor(), trustedAdvisorServiceProvider()];
};

export const dataRecipient = {
  all,
  accreditedDataRecipient,
  cdrRepresentative,
  trustedAdvisor,
  trustedAdvisorServiceProvider,
};
