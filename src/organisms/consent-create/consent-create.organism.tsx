import React, { useEffect, useState } from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '../../generated/consent';
import { MaxAccountConnectedMessage } from '../../atoms/max-account-connected-message/max-account-connected-message.atom';
import { Helper } from '../../utils/helper/helper';
import { ConsentInputDataHolder } from '../consent-inputs/consent-input-data-holder.organism';
import { ConsentCreateForm } from './consent-create-form.organism';
import { useConsentForm } from '../../context/consentForm.context';
import { useDataRecipients } from '../../context/data-recipient.context';
import { ConsentInsightForm } from './consent-insight-form.organism';
import { Logger } from '../../utils/logger/logger';
import { UseCaseFeature } from '../../consts/use-case-features.const';

export type ConsentCreateProps = {
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
};

export const ConsentCreate = (props: ConsentCreateProps) => {
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
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const { dataRecipients } = useDataRecipients();

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
        Logger.error(`Data holder ID ${dataHolderId} is not in use case allowed data holders`, useCase.dataHolders);
      }
    }

    if (useCase.features?.includes(UseCaseFeature.CDR_INSIGHTS)) {
      setShowInsights(true);
    }
  }, []);

  if (!allowMultiConsentsPerDataHolder) {
    disableDataHolders = Helper.filterDataHoldersByConsentsAndUseCase(useCase.dataHolders, existingConsents, useCase);
  }

  const handleInsightsSubmit = () => {
    setShowInsights(false);
  };

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
          {consentForm.dataHolder && showInsights && (
            // Hard coded until insight scopes are returned in API
            <ConsentInsightForm
              insightScopes={[
                {
                  name: 'Insight name',
                  id: 'insight:scope:cliam:id',
                  purpose: 'Insight purpose',
                  description: 'Insight description',
                  claims: ['Claim 1', 'Claim 2'],
                  priority: 1,
                },
              ]}
              onCancel={handleCancel}
              onSubmit={handleInsightsSubmit}
            />
          )}
          {consentForm.dataHolder && !showInsights && (
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
