import { Copy } from '../../../../types/copy.type';
import { Organisation } from '../../../../types/organisation.type';
import { commonCopy } from './common.copy';
import { componentCopy } from './component.copy';
import { consentCopy } from './consent.copy';
import { errorCopy } from './error.copy';

const generateCopy = (org: Organisation): Copy => {
  return {
    common: { ...commonCopy() },
    consent: { ...consentCopy(org) },
    component: { ...componentCopy(org) },
    error: { ...errorCopy() },
  };
};

export const copy = {
  generateCopy,
};
