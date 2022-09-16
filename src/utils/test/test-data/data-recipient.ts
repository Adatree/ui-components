import { DataRecipient, DataRecipientType } from '../../../types/data-recipient.type';

export const accreditedDataRecipient = (): DataRecipient => {
  return {
    accreditationNumber: 'ADR-1234-5678',
    complaintEmail: 'adr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com.au/adr-cdr-policy',
    dataPolicyUrl: 'https://www.example.com.au/adr-data-policy',
    dataSharingRevocationEmail: 'adr.data.sharing.revocation@example.com',
    description: 'This is an Accredited Data Recipient and they provide the service X.',
    logo: '/assets/images/adr-test-company-logo.png',
    name: 'Accredited Company',
    protectionFrameworkUrl: 'https://www.example.com.au/adr-protection-framework',
    type: DataRecipientType.ACCREDITED_DATA_RECIPIENT,
    underCdrPrincipal: false,
  };
};

export const cdrRepresentative = (): DataRecipient => {
  return {
    accreditationNumber: 'CDRR-1234-5678',
    complaintEmail: 'cdrr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com.au/cdrr-cdr-policy',
    dataPolicyUrl: 'https://www.example.com.au/cdrr-data-policy',
    dataSharingRevocationEmail: 'cdrr.data.sharing.revocation@example.com',
    description: 'This is a CDR representative and they provide the service X.',
    logo: '/assets/images/cdrr-test-company-logo.png',
    name: 'CDR Representative Company',
    protectionFrameworkUrl: 'https://www.example.com.au/cdrr-protection-framework',
    type: DataRecipientType.CDR_REPRESENTATIVE,
    underCdrPrincipal: true,
  };
};

export const trustedAdvisor = (): DataRecipient => {
  return {
    accreditationNumber: 'TA-1234-5678',
    complaintEmail: 'ta-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com.au/ta-cdr-policy',
    dataPolicyUrl: 'https://www.example.com.au/ta-data-policy',
    dataSharingRevocationEmail: 'ta-data.sharing.revocation@example.com',
    description: 'This is a Trusted Adviser and they provide the service X.',
    logo: '/assets/images/ta-test-company-logo.png',
    name: 'Trusted Advisor Company',
    protectionFrameworkUrl: 'https://www.example.com.au/ta-protection-framework',
    type: DataRecipientType.TRUSTED_ADVISER,
    underCdrPrincipal: false,
  };
};

export const trustedAdvisorServiceProvider = (): DataRecipient => {
  return {
    accreditationNumber: 'TASP-1234-5678',
    complaintEmail: 'tasp-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com.au/tasp-cdr-policy',
    dataPolicyUrl: 'https://www.example.com.au/tasp-data-policy',
    dataSharingRevocationEmail: 'tasp-data.sharing.revocation@example.com',
    description: 'This is a Trusted Adviser Service Provider and they provide the service X.',
    logo: '/assets/images/tasp-test-company-logo.png',
    name: 'Trusted Advisor Service Provider Company',
    protectionFrameworkUrl: 'https://www.example.com.au/tasp-protection-framework',
    type: DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER,
    underCdrPrincipal: false,
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
