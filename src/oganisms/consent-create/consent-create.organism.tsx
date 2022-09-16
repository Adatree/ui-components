import React from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '../../generated/consent';
import { MaxAccountConnectedMessage } from '../../atoms/max-account-connected-message/max-account-connected-message.atom';
import { Helper } from '../../utils/helper/helper';
import { ConsentInputDataHolder } from '../consent-inputs/consent-input-data-holder.organism';
import { ConsentCreateForm } from './consent-create-form.organism';
import { DataRecipient } from '../../types/data-recipient.type';
import { useConsentForm } from '../../context/consentForm.context';

export type ConsentCreateProps = {
  existingConsents: ConsentResponse[];
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  favouriteDataHolders?: DataHolder[];
  dataHandlers?: DataRecipient[];
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentCreate = (props: ConsentCreateProps) => {
  const {
    existingConsents,
    useCase,
    enablePartnerMessageDiscreetMode = false,
    favouriteDataHolders,
    dataHandlers,
    onCancel,
    onSubmit,
  } = props;
  const [consentForm] = useConsentForm();

  const disableDataHolders = Helper.filterDataHoldersByConsentsAndUseCase(
    useCase.dataHolders,
    existingConsents,
    useCase,
  );

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && useCase.dataHolders.length > disableDataHolders.length && (
        <>
          {!consentForm.dataHolder && (
            <ConsentInputDataHolder
              existingConsents={existingConsents}
              useCase={useCase}
              favouriteDataHolders={favouriteDataHolders}
            />
          )}
          {consentForm.dataHolder && (
            <ConsentCreateForm
              enablePartnerMessageDiscreetMode={enablePartnerMessageDiscreetMode}
              useCase={useCase}
              dataHandlers={dataHandlers}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </>
      )}

      {useCase.dataHolders && useCase.dataHolders.length === disableDataHolders.length && (
        <MaxAccountConnectedMessage useCase={useCase} onClick={handleCancel} />
      )}
    </section>
  );
};
