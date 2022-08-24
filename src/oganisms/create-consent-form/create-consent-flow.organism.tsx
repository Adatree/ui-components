import React from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '../../generated/consent';
import { Organisation } from '../../types/organisation.type';
import { Copy } from '../../types/copy.type';
import { MaxAccountConnectedMessage } from '../../atoms/max-account-connected-message/max-account-connected-message.atom';
import { Helper } from '../../utils/helper/helper';
import { ConsentInputDataHolder } from '../consent-inputs/consent-input-data-holder.organism';
import { ConsentInputScopes } from '../consent-inputs/consent-input-scopes.organism';
import { useConsentForm } from '../../context/consentForm.context';

export type CreateConsentProps = {
  copy: Copy;
  existingConsents: ConsentResponse[];
  organisation: Organisation;
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  favouriteDataHolders?: DataHolder[];
  onCancel: () => void;
  onSubmit: () => void;
};

export const CreateConsentFlow = (props: CreateConsentProps) => {
  const {
    copy,
    existingConsents,
    organisation,
    useCase,
    enablePartnerMessageDiscreetMode = false,
    favouriteDataHolders,
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
              copy={copy}
              existingConsents={existingConsents}
              useCase={useCase}
              favouriteDataHolders={favouriteDataHolders}
            />
          )}
          {consentForm.dataHolder && (
            <ConsentInputScopes
              copy={copy}
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
