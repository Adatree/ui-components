import React from 'react';
import { ConsentResponse, UseCaseResponse } from '../../generated/consent';
import { Organisation } from '../../types/organisation.type';
import { Copy } from '../../types/copy.type';
import { MaxAccountConnectedMessage } from '../../atoms/max-account-connected-message/max-account-connected-message.atom';
import { Helper } from '../../utils/helper/helper';
import { CreateConsentSelectDataHolder } from './create-consent-select-data-holder.organism';
import { useConsentForm } from '../../context/consentForm.context';
import { CreateConsentSelectScopes } from './create-consent-select-scopes.organism';

export type CreateConsentProps = {
  copy: Copy;
  existingConsents: ConsentResponse[];
  organisation: Organisation;
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
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
            <CreateConsentSelectDataHolder copy={copy} existingConsents={existingConsents} useCase={useCase} />
          )}
          {consentForm.dataHolder && (
            <CreateConsentSelectScopes
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
