import React from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '../../generated/consent';
import { Organisation } from '../../types/organisation.type';
import { MaxAccountConnectedMessage } from '../../atoms/max-account-connected-message/max-account-connected-message.atom';
import { Helper } from '../../utils/helper/helper';
import { ConsentInputDataHolder } from '../consent-inputs/consent-input-data-holder.organism';
import { ConsentCreateForm } from './consent-create-form.organism';
import { useConsentForm } from '../../context/consentForm.context';
import { useCopy } from '../../context/copy.context';

export type ConsentCreateProps = {
  existingConsents: ConsentResponse[];
  organisation: Organisation;
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  favouriteDataHolders?: DataHolder[];
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentCreate = (props: ConsentCreateProps) => {
  const {
    existingConsents,
    organisation,
    useCase,
    enablePartnerMessageDiscreetMode = false,
    favouriteDataHolders,
    onCancel,
    onSubmit,
  } = props;
  const [consentForm] = useConsentForm();
  const [copy] = useCopy();

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
              organisation={organisation}
              enablePartnerMessageDiscreetMode={enablePartnerMessageDiscreetMode}
              useCase={useCase}
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
