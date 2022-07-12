import React from 'react';
import { AccessFrequency, SharingDuration } from '../../generated/consent';
import { Formatter } from '../formatter/formater';
import { Helper } from '../helper/helper';

const confirmation = (
  companyName: string,
  endDate: Date | undefined,
  sharingDuration: SharingDuration | undefined,
): React.ReactNode => {
  const common = (
    <>
      I confirm that I am allowing <strong>{companyName}</strong> to access my data (listed above)
    </>
  );

  if (endDate && sharingDuration === SharingDuration.CUSTOM) {
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
  } else if (sharingDuration && sharingDuration !== SharingDuration.CUSTOM) {
    return (
      <>
        {common} for a period of <strong>{Helper.sharingDurationToString(sharingDuration)}</strong>.
      </>
    );
  } else {
    return <>{common}.</>;
  }
};

const accessFrequency = (companyName: string, accessFrequency: AccessFrequency | undefined): React.ReactNode => {
  const common = (
    <>
      <strong>{companyName}</strong> will be able to access your data
    </>
  );

  if (accessFrequency === AccessFrequency.ONCEOFF) {
    return (
      <>
        Data sharing with <strong>{companyName}</strong> ends after <strong>first use</strong>.
      </>
    );
  } else if (accessFrequency === AccessFrequency.ONGOING) {
    return (
      <>
        {common} <strong>multiple times</strong> during this period.
      </>
    );
  } else {
    return <>{common}.</>;
  }
};

export const TextBuilder = {
  accessFrequency,
  confirmation,
};
