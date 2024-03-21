export enum DataRecipientType {
  ACCREDITED_DATA_RECIPIENT = 'ACCREDITED_DATA_RECIPIENT',
  BUSINESS_CONSUMER_DISCLOSURE_CONSENT = 'BUSINESS_CONSUMER_DISCLOSURE_CONSENT',
  CDR_REPRESENTATIVE = 'CDR_REPRESENTATIVE',
  GRANTEE = 'GRANTEE',
  NON_ACCREDITED_DATA_RECIPIENT = 'NON_ACCREDITED_DATA_RECIPIENT',
  TRUSTED_ADVISER = 'TRUSTED_ADVISER',
  TRUSTED_ADVISER_SERVICE_PROVIDER = 'TRUSTED_ADVISER_SERVICE_PROVIDER',
}
export interface DataRecipient {
  cdrPolicyUrl: string;
  complaintEmail: string;
  dataSharingRevocationEmail: string;
  description: string;
  logo: string;
  name: string;
  website: string;
  type: DataRecipientType;
}
