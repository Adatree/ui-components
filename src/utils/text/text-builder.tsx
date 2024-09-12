import React from 'react';
import { Highlight as HL } from '../../atoms/highlight-text/highlight-text.atom';
import { AccessFrequency, SharingDuration } from '@adatree/react-api-sdk';
import { Formatter } from '../formatter/formatter';
import { Helper } from '../helper/helper';

const confirmation = (
  companyName: string,
  endDate: Date | undefined,
  sharingDuration: SharingDuration | undefined,
): React.ReactNode => {
  const common = (
    <>
      I confirm that I am allowing <HL>{companyName}</HL> to access my data (listed above)
    </>
  );

  if (endDate && sharingDuration === SharingDuration.Custom) {
    return (
      <>
        {common} until the <HL>{Formatter.formatDateTime(endDate)}</HL>.
      </>
    );
  } else if (sharingDuration === SharingDuration.OnceOff) {
    return (
      <>
        {common} <HL>once</HL>.
      </>
    );
  } else if (sharingDuration && sharingDuration !== SharingDuration.Custom) {
    return (
      <>
        {common} for a period of <HL>{Helper.sharingDurationToString(sharingDuration)}</HL>.
      </>
    );
  } else {
    return <>{common}.</>;
  }
};

const accessFrequency = (companyName: string, accessFrequency: AccessFrequency | undefined): React.ReactNode => {
  const common = <>{companyName} will be able to access your data</>;

  if (accessFrequency === AccessFrequency.OnceOff) {
    return (
      <>
        Data sharing with {companyName} ends after <HL>first use</HL>.
      </>
    );
  } else if (accessFrequency === AccessFrequency.Ongoing) {
    return (
      <>
        {common} <HL>multiple times</HL> during this period.
      </>
    );
  } else {
    return <>{common}.</>;
  }
};

const currentAccess = (companyName: string, endDate: string | undefined): React.ReactNode => {
  const common = <>You are currently allowing {companyName} to access your data</>;

  if (endDate) {
    return (
      <>
        {common} until the <HL>{Formatter.formatDateTime(endDate)}</HL>.
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
