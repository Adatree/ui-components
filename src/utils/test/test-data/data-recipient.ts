import { DataRecipient } from '../../../types/data-recipient.type';

export const accredited = (): DataRecipient => {
  return {
    accreditationNumber: 'ADR-1234-5678',
    complaintEmail: 'adr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com.au/adr-cdr-policy',
    dataSharingRevocationEmail: 'adr.data.sharing.revocation@example.com',
    logo: '/assets/images/adr-test-company-logo.png',
    name: 'Accredited Company',
    underCdrPrincipal: false,
  };
};

export const cdrRepresentative = (): DataRecipient => {
  return {
    accreditationNumber: 'CDRR-1234-5678',
    complaintEmail: 'cdrr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com.au/cdrr-cdr-policy',
    dataSharingRevocationEmail: 'cdrr.data.sharing.revocation@example.com',
    logo: '/assets/images/cdrr-test-company-logo.png',
    name: 'CDR Representative Company',
    underCdrPrincipal: true,
  };
};
export const trustedAdvisor = (): DataRecipient => {
  return {
    accreditationNumber: 'TA-1234-5678',
    complaintEmail: 'ta-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com.au/ta-cdr-policy',
    dataSharingRevocationEmail: 'ta-data.sharing.revocation@example.com',
    logo: '/assets/images/ta-test-company-logo.png',
    name: 'Trusted Advisor Company',
    underCdrPrincipal: false,
  };
};
export const dataRecipient = {
  accredited,
  cdrRepresentative,
  trustedAdvisor,
};
