import React, { useEffect, useState } from 'react';
import { PostUsageAction, SharingDuration, UseCaseResponse } from '../../generated/consent';
import { useConsentForm } from '../../context/consentForm.context';
import { Helper } from '../../utils/helper/helper';
import { useDataRecipients } from '../../context/data-recipient.context';
import { useCopy } from '../../context/copy.context';
import { ConsentSectionHeader } from '../../molecules/consent-section/consent-section-header.molecule';
import { ConsentSectionScopes } from '../../molecules/consent-section/consent-section-scopes.molecule';
import { ConsentSectionDates } from '../../molecules/consent-section/consent-section-dates.molecule';
import { ConsentSectionInfo } from '../../molecules/consent-section/consent-section-info.molecule';
import { ConsentSectionActions } from '../../molecules/consent-section/consent-section-actions.molecule';
import { PartnerMessageDialog } from '../../molecules/partner-message-dialog/partner-message-dialog.molecule';
import { DataRecipient, DataRecipientType } from '../../types/data-recipient.type';
import { InsightResponse } from '../../types/insight-response.type';
import { ConsentSectionDeIdentify } from '../../molecules/consent-section/consent-section-deletion.molecule';
import { BusinessConsumerStatement } from '../../molecules/business-consumer-statement/business-consumer-statement.molecule';

export type ConsentCreateFormProps = {
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  dataHandlers?: DataRecipient[];
  insightResponse?: InsightResponse;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentCreateForm = (props: ConsentCreateFormProps) => {
  const {
    useCase,
    enablePartnerMessageDiscreetMode = false,
    dataHandlers,
    insightResponse,
    onCancel,
    onSubmit,
  } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [showDeIdentifyError, setShowDeIdentifyError] = useState(false);
  const [showDeIdentifySection, setShowDeIdentifySection] = useState(false);
  const [subTitle, setSubTitle] = useState<string>();
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();
  const { primaryDataRecipient, dataRecipients } = useDataRecipients();

  const dataHandlersWithoutPrimary = dataHandlers?.filter((dataRecipient) => {
    return dataRecipient.type !== primaryDataRecipient.type;
  });

  useEffect(() => {
    if (
      useCase.sharingDurations &&
      useCase.sharingDurations.length === 1 &&
      !useCase.sharingDurations.includes(SharingDuration.Custom)
    ) {
      consentForm.selectedSharingDurations = useCase.sharingDurations[0];
      consentForm.sharingEndDate = Helper.sharingDurationToDate(useCase.sharingDurations[0]);
      setConsentForm({ ...consentForm });
    }

    if (insightResponse) {
      setSubTitle(
        `${insightResponse.nonAccreditedDataRecipient} has partnered with ${primaryDataRecipient.name} to securely access your data. ${primaryDataRecipient.description}`,
      );
    }

    // @ts-ignore
    if (useCase.features && Array.isArray(useCase.features) && useCase.features.includes('DE_IDENTIFICATION')) {
      consentForm.postUsageAction = undefined;
      setConsentForm({ ...consentForm });
      setShowDeIdentifySection(true);
    } else {
      consentForm.postUsageAction = PostUsageAction.Deletion;
      setConsentForm({ ...consentForm });
    }
  }, []);

  useEffect(() => {
    if (consentForm.selectedSharingDurations) {
      setShowDateError(false);
    }

    if (
      consentForm.allAddScopesChecked &&
      consentForm.dataHolder &&
      consentForm.selectedSharingDurations &&
      consentForm.postUsageAction
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [consentForm]);

  const handlePartnerDialogClose = () => {
    setIsPartnerDialogOpen(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handlePreSubmit = () => {
    setIsPartnerDialogOpen(false);

    if (isFormValid) {
      if (primaryDataRecipient.type === DataRecipientType.CDR_REPRESENTATIVE) {
        setIsPartnerDialogOpen(true);
      } else {
        handleSubmit();
      }
    } else {
      setShowDataHolderError(!consentForm.dataHolder);
      setShowDateError(!consentForm.selectedSharingDurations);
      setShowDeIdentifyError(!consentForm.postUsageAction);
      setShowScopeError(consentForm.allAddScopesChecked === true ? false : true);
    }
  };

  const handleScopeChange = (isAllClicked: boolean) => {
    consentForm.allAddScopesChecked = isAllClicked;
    setConsentForm({ ...consentForm });
    setShowScopeError(false);
  };

  const handleDeIdentifyChange = (value: boolean) => {
    if (value) {
      consentForm.postUsageAction = PostUsageAction.DeIdentification;
    } else {
      consentForm.postUsageAction = undefined;
    }

    setConsentForm({ ...consentForm });
    setShowDeIdentifyError(false);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && (
        <>
          <ConsentSectionHeader
            dataHolderName={consentForm.dataHolder?.brandName === undefined ? ' ' : consentForm.dataHolder?.brandName}
            subTitle={subTitle}
          />

          <ConsentSectionScopes
            message={copy.consent.edit.scope_create_message}
            scopes={useCase.scopes}
            showError={showScopeError}
            onChange={handleScopeChange}
          />

          {Helper.isBcdc(dataRecipients) && Helper.isOrganisation(useCase) && <BusinessConsumerStatement />}

          {showDeIdentifySection && (
            <ConsentSectionDeIdentify showError={showDeIdentifyError} onCheck={handleDeIdentifyChange} />
          )}
          <ConsentSectionDates useCase={useCase} showError={showDateError} />

          <ConsentSectionInfo useCase={useCase} dataHandlers={dataHandlersWithoutPrimary} />

          <ConsentSectionActions
            actionButtonLabel={copy.consent.create.consent_label}
            cancelButtonLabel={copy.consent.create.cancel_label}
            cancelButtonMessage={copy.consent.create.cancel_consent_message}
            isValid={isFormValid}
            showError={showDataHolderError || showDateError || showScopeError}
            onCancel={handleCancel}
            onSubmit={handlePreSubmit}
          />
        </>
      )}

      <PartnerMessageDialog
        dataHolderName={
          consentForm.dataHolder ? consentForm.dataHolder?.brandName : copy.common.fallback_data_holder_name
        }
        discreetMode={enablePartnerMessageDiscreetMode}
        isOpen={isPartnerDialogOpen}
        onClose={handlePartnerDialogClose}
        onSubmit={handleSubmit}
      />
    </section>
  );
};
