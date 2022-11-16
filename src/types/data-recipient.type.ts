export enum DataRecipientType {
  ACCREDITED_DATA_RECIPIENT = 'ACCREDITED_DATA_RECIPIENT',
  CDR_REPRESENTATIVE = 'CDR_REPRESENTATIVE',
  GRANTEE = 'GRANTEE',
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
  type: DataRecipientType;
}
