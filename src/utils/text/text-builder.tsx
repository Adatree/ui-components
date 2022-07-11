import React from 'react';
import { SharingDuration } from '../../generated/consent';
import { Formatter } from '../formatter/formater';
import { Helper } from '../helper/helper';

const confirmation = (companyName: string, endDate: Date, sharingDuration: SharingDuration): React.ReactNode => {
  const common = (
    <>
      I confirm that I am allowing <strong>{companyName}</strong> to access my data (listed above)
    </>
  );

  if (sharingDuration === SharingDuration.CUSTOM) {
    return (
      <>
        {common} untill the <strong>{Formatter.formatDateTime(endDate)}</strong>.
      </>
    );
  } else if (sharingDuration === SharingDuration.ONCEOFF) {
    return (
      <>
        {common} <strong>once</strong>.
      </>
    );
  } else {
    return (
      <>
        {common} for a period of <strong>{Helper.sharingDurationToString(sharingDuration)}</strong>.
      </>
    );
  }
};

export const TextBuilder = {
  confirmation,
};
