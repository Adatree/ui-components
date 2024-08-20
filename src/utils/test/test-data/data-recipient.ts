import { DataRecipient, DataRecipientType } from '../../../types/data-recipient.type';

export const accreditedDataRecipient = (): DataRecipient => {
  return {
    complaintEmail: 'adr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/adr-cdr-policy',
    dataSharingRevocationEmail: 'adr.data.sharing.revocation@example.com',
    description: 'Accredited Data Recipient provides the service X.',
    logo: '/assets/images/adr-test-company-logo.png',
    name: 'Accredited Company',
    website: 'www.adr.example.com',
    type: DataRecipientType.ACCREDITED_DATA_RECIPIENT,
  };
};

export const businessConsumerDisclosureConsent = (): DataRecipient => {
  return {
    complaintEmail: 'bcdc-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/bcdc-cdr-policy',
    dataSharingRevocationEmail: 'bcdc.data.sharing.revocation@example.com',
    description: 'BCDC representative provides the service X.',
    logo: '/assets/images/bcdc-test-company-logo.png',
    name: 'BCDC Representative Company',
    website: 'www.bcdc.example.com',
    type: DataRecipientType.BUSINESS_CONSUMER_DISCLOSURE_CONSENT,
  };
};

export const cdrRepresentative = (): DataRecipient => {
  return {
    complaintEmail: 'cdrr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/cdrr-cdr-policy',
    dataSharingRevocationEmail: 'cdrr.data.sharing.revocation@example.com',
    description: 'CDR representative provides the service X.',
    logo: '/assets/images/cdrr-test-company-logo.png',
    name: 'CDR Representative Company',
    website: 'www.cdr.example.com',
    type: DataRecipientType.CDR_REPRESENTATIVE,
  };
};

export const granteeRepresentative = (): DataRecipient => {
  return {
    complaintEmail: 'gr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/adr-cdr-policy',
    dataSharingRevocationEmail: 'gr.data.sharing.revocation@example.com',
    description: 'Grantee provides the service X.',
    logo: '/assets/images/adr-test-company-logo.png',
    name: 'Grantee Company',
    website: 'www.gr.example.com',
    type: DataRecipientType.GRANTEE,
  };
};

export const nonAccreditedDataRecipient = (): DataRecipient => {
  return {
    complaintEmail: 'non-adr-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/non-adr-cdr-policy',
    dataSharingRevocationEmail: 'non-adr.data.sharing.revocation@example.com',
    description: 'Non Accredited Data Recipient provides the service X.',
    logo: '/assets/images/adr-test-company-logo.png',
    name: 'Non Accredited Company',
    website: 'www.na.example.com',
    type: DataRecipientType.NON_ACCREDITED_PERSON,
  };
};

export const trustedAdvisor = (): DataRecipient => {
  return {
    complaintEmail: 'ta-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/ta-cdr-policy',
    dataSharingRevocationEmail: 'ta-data.sharing.revocation@example.com',
    description: 'Trusted Adviser provides the service X.',
    logo: '/assets/images/ta-test-company-logo.png',
    name: 'Trusted Advisor Company',
    website: 'www.ta.example.com',
    type: DataRecipientType.TRUSTED_ADVISER,
  };
};

export const trustedAdvisorServiceProvider = (): DataRecipient => {
  return {
    complaintEmail: 'tasp-complaint@example.com',
    cdrPolicyUrl: 'https://www.example.com/tasp-cdr-policy',
    dataSharingRevocationEmail: 'tasp-data.sharing.revocation@example.com',
    description: 'Trusted Adviser Service Provider provides the service X.',
    logo: '/assets/images/tasp-test-company-logo.png',
    name: 'Trusted Advisor Service Provider Company',
    website: 'www.tas.example.com',
    type: DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER,
  };
};

const all = (): DataRecipient[] => {
  return [
    accreditedDataRecipient(),
    businessConsumerDisclosureConsent(),
    cdrRepresentative(),
    granteeRepresentative(),
    trustedAdvisor(),
    trustedAdvisorServiceProvider(),
  ];
};

export const dataRecipient = {
  all,
  accreditedDataRecipient,
  businessConsumerDisclosureConsent,
  cdrRepresentative,
  granteeRepresentative,
  nonAccreditedDataRecipient,
  trustedAdvisor,
  trustedAdvisorServiceProvider,
};
