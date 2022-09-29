export enum DataRecipientType {
  ACCREDITED_DATA_RECIPIENT = 'ACCREDITED_DATA_RECIPIENT',
  CDR_REPRESENTATIVE = 'CDR_REPRESENTATIVE',
  TRUSTED_ADVISER = 'TRUSTED_ADVISER',
  TRUSTED_ADVISER_SERVICE_PROVIDER = 'TRUSTED_ADVISER_SERVICE_PROVIDER',
}
export interface DataRecipient {
  cdrPolicyUrl: string;
  complaintEmail: string;
  dataPolicyUrl: string;
  dataSharingRevocationEmail: string;
  description: string;
  logo: string;
  name: string;
  protectionFrameworkUrl: string;
  type: DataRecipientType;
}
