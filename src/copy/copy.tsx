import { Industry } from '../generated/consent';
import { Copy } from '../types/copy.type';
import { DataRecipient } from '../types/data-recipient.type';
import { commonCopy } from './common.copy';
import { componentCopy } from './component.copy';
import { consentCopy } from './consent.copy';
import { errorCopy } from './error.copy';

const generateCopy = (
  adrDataRecipient: DataRecipient,
  primaryDataRecipient: DataRecipient,
  industry: Industry,
): Copy => {
  let providerType = 'data provider';

  if (industry === Industry.Banking) {
    providerType = 'bank';
  } else if (industry === Industry.Energy) {
    providerType = 'energy provider';
  }

  return {
    common: { ...commonCopy() },
    consent: { ...consentCopy(primaryDataRecipient, providerType) },
    component: { ...componentCopy(adrDataRecipient, primaryDataRecipient, providerType) },
    error: { ...errorCopy() },
  };
};

export const CopyBuilder = {
  generateCopy,
};
