import React, { useEffect } from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '@adatree/react-api-sdk-dashboard';
import { MaxAccountConnectedMessage } from '../../atoms/max-account-connected-message/max-account-connected-message.atom';
import { Helper } from '../../utils/helper/helper';
import { ConsentInputDataHolder } from '../consent-inputs/consent-input-data-holder.organism';
import { ConsentCreateForm } from './consent-create-form.organism';
import { useConsentForm } from '../../context/consentForm.context';
import { useDataRecipients } from '../../context/data-recipient.context';
import { Logger } from '../../utils/logger/logger';
import { AnalyticsEvents, useAnalytics } from '../../context/analytics.context';

interface Props {
  existingConsents: ConsentResponse[];
  useCase: UseCaseResponse;
  blockedDataHolderList?: DataHolder[];
  enablePartnerMessageDiscreetMode?: boolean;
  dataHolderId?: string;
  favouriteDataHolders?: DataHolder[];
  hideMaxAccountConnectedBackButton?: boolean;
  allowMultiConsentsPerDataHolder?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onNotListedClick?: () => void;
}

export const ConsentCreate = (props: Props) => {
  const {
    existingConsents,
    useCase,
    blockedDataHolderList = [],
    enablePartnerMessageDiscreetMode = false,
    dataHolderId,
    favouriteDataHolders,
    hideMaxAccountConnectedBackButton = false,
    allowMultiConsentsPerDataHolder = false,
    onCancel,
    onSubmit,
    onNotListedClick,
  } = props;
  const [consentForm, setConsentForm] = useConsentForm();
  const { dataRecipients } = useDataRecipients();
  const { track } = useAnalytics();

  let disableDataHolders: DataHolder[] = [];

  useEffect(() => {
    if (dataHolderId && useCase && useCase.dataHolders) {
      const foundDataHolder = useCase.dataHolders.find((dataHolder) => {
        return dataHolderId === dataHolder.dataHolderBrandId;
      });
      if (foundDataHolder) {
        consentForm.dataHolder = foundDataHolder;
        setConsentForm({ ...consentForm });
      }
      if (!foundDataHolder) {
        track(AnalyticsEvents.CONSENT_DATAHOLDER_ERROR_RECEIVED);
        Logger.error(`Data holder ID ${dataHolderId} is not in use case allowed data holders`, useCase.dataHolders);
      }
    }
  }, []);

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
              onCancel={handleCancel}
              onNotListedClick={onNotListedClick}
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
