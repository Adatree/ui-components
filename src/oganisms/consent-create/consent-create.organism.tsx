import React from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '../../generated/consent';
import { MaxAccountConnectedMessage } from '../../atoms/max-account-connected-message/max-account-connected-message.atom';
import { Helper } from '../../utils/helper/helper';
import { ConsentInputDataHolder } from '../consent-inputs/consent-input-data-holder.organism';
import { ConsentCreateForm } from './consent-create-form.organism';
import { useConsentForm } from '../../context/consentForm.context';
import { useDataRecipients } from '../../context/data-recipient.context';

export type ConsentCreateProps = {
  existingConsents: ConsentResponse[];
  useCase: UseCaseResponse;
  blockedDataHolderList?: DataHolder[];
  enablePartnerMessageDiscreetMode?: boolean;
  favouriteDataHolders?: DataHolder[];
  hideMaxAccountConnectedBackButton?: boolean;
  allowMultiConsentsPerDataHolder?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentCreate = (props: ConsentCreateProps) => {
  const {
    existingConsents,
    useCase,
    blockedDataHolderList = [],
    enablePartnerMessageDiscreetMode = false,
    favouriteDataHolders,
    hideMaxAccountConnectedBackButton = false,
    allowMultiConsentsPerDataHolder = false,
    onCancel,
    onSubmit,
  } = props;
  const [consentForm] = useConsentForm();
  const { dataRecipients } = useDataRecipients();

  let disableDataHolders: DataHolder[] = [];

  if (!allowMultiConsentsPerDataHolder) {
    disableDataHolders = Helper.filterDataHoldersByConsentsAndUseCase(useCase.dataHolders, existingConsents, useCase);
  }

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
              disableDataHolders={disableDataHolders}
              useCase={useCase}
              favouriteDataHolders={favouriteDataHolders}
              blockedDataHolderList={blockedDataHolderList}
            />
          )}
          {consentForm.dataHolder && (
            <ConsentCreateForm
              enablePartnerMessageDiscreetMode={enablePartnerMessageDiscreetMode}
              useCase={useCase}
              dataHandlers={dataRecipients}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </>
      )}

      {useCase.dataHolders && useCase.dataHolders.length === disableDataHolders.length && (
        <MaxAccountConnectedMessage
          useCase={useCase}
          hideBackButton={hideMaxAccountConnectedBackButton}
          onClick={handleCancel}
        />
      )}
    </section>
  );
};
