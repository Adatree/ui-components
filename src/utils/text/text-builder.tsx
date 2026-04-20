import React from 'react';
import { Highlight as HL } from '../../atoms/highlight-text/highlight-text.atom';
import { AccessFrequency, SharingDuration } from '@adatree/react-api-sdk-dashboard';
import { Formatter } from '../formatter/formatter';
import { Helper } from '../helper/helper';
import { DataRecipient, DataRecipientType } from '../../types/data-recipient.type';

const confirmation = (
  dataRecipient: DataRecipient,
  endDate: Date | undefined,
  sharingDuration: SharingDuration | undefined,
): React.ReactNode => {
  const common = (
    <>
      {dataRecipient.type === DataRecipientType.DIRECT_TO_CONSUMER && (
        <>
          I confirm that I am allowing my <HL>{dataRecipient.name}</HL> account to access my data (listed above)
        </>
      )}
      {dataRecipient.type !== DataRecipientType.DIRECT_TO_CONSUMER && (
        <>
          I confirm that I am allowing <HL>{dataRecipient.name}</HL> to access my data (listed above)
        </>
      )}
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

const accessFrequency = (
  dataRecipient: DataRecipient,
  accessFrequency: AccessFrequency | undefined,
): React.ReactNode => {
  const common = (
    <>
      {dataRecipient.type === DataRecipientType.DIRECT_TO_CONSUMER && (
        <>Your {dataRecipient.name} account will be able to access your data</>
      )}
      {dataRecipient.type !== DataRecipientType.DIRECT_TO_CONSUMER && (
        <>{dataRecipient.name} will be able to access your data</>
      )}
    </>
  );

  const commonOnceOff = (
    <>
      {dataRecipient.type === DataRecipientType.DIRECT_TO_CONSUMER && <>your {dataRecipient.name} account</>}
      {dataRecipient.type !== DataRecipientType.DIRECT_TO_CONSUMER && <>{dataRecipient.name}</>}
    </>
  );

  if (accessFrequency === AccessFrequency.OnceOff) {
    return (
      <>
        Data sharing with {commonOnceOff} ends after <HL>first use</HL>.
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

const currentAccess = (dataRecipient: DataRecipient, endDate: string | undefined): React.ReactNode => {
  const common = (
    <>
      {dataRecipient.type === DataRecipientType.DIRECT_TO_CONSUMER && (
        <>You are currently allowing your {dataRecipient.name} account to access your data</>
      )}
      {dataRecipient.type !== DataRecipientType.DIRECT_TO_CONSUMER && (
        <>You are currently allowing {dataRecipient.name} to access your data</>
      )}
    </>
  );

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
