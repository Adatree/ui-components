import { Industry } from '../generated/consent';
import { Copy } from '../types/copy.type';
import { Organisation } from '../types/organisation.type';
import { commonCopy } from './common.copy';
import { componentCopy } from './component.copy';
import { consentCopy } from './consent.copy';
import { errorCopy } from './error.copy';

const generateCopy = (org: Organisation, industry: Industry): Copy => {
  let providerType = 'data provider';

  if (industry === Industry.BANKING) {
    providerType = 'bank';
  } else if (industry === Industry.ENERGY) {
    providerType = 'energy provider';
  }

  return {
    common: { ...commonCopy() },
    consent: { ...consentCopy(org, providerType) },
    component: { ...componentCopy(org) },
    error: { ...errorCopy() },
  };
};

export const copy = {
  generateCopy,
};
