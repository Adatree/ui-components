import React from 'react';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
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
      I confirm that I am allowing <Highlight>{companyName}</Highlight> to access my data (listed above)
    </>
  );

  if (endDate && sharingDuration === SharingDuration.CUSTOM) {
    return (
      <>
        {common} until the <Highlight>{Formatter.formatDateTime(endDate)}</Highlight>.
      </>
    );
  } else if (sharingDuration === SharingDuration.ONCEOFF) {
    return (
      <>
        {common} <Highlight>once</Highlight>.
      </>
    );
  } else if (sharingDuration && sharingDuration !== SharingDuration.CUSTOM) {
    return (
      <>
        {common} for a period of <Highlight>{Helper.sharingDurationToString(sharingDuration)}</Highlight>.
      </>
    );
  } else {
    return <>{common}.</>;
  }
};

const accessFrequency = (companyName: string, accessFrequency: AccessFrequency | undefined): React.ReactNode => {
  const common = (
    <>
      <Highlight>{companyName}</Highlight> will be able to access your data
    </>
  );

  if (accessFrequency === AccessFrequency.ONCEOFF) {
    return (
      <>
        Data sharing with <Highlight>{companyName}</Highlight> ends after first use.
      </>
    );
  } else if (accessFrequency === AccessFrequency.ONGOING) {
    return <>{common} multiple times during this period.</>;
  } else {
    return <>{common}.</>;
  }
};

const currentAccess = (companyName: string, endDate: string | undefined): React.ReactNode => {
  const common = (
    <>
      You are currently allowing <Highlight>{companyName}</Highlight> to access your data
    </>
  );

  if (endDate) {
    return (
      <>
        {common} until the <Highlight>{Formatter.formatDateTime(endDate)}</Highlight>.
      </>
    );
  } else {
    return <>{common}.</>;
  }
};

export const TextBuilder = {
  accessFrequency,
  confirmation,
  currentAccess,
};
