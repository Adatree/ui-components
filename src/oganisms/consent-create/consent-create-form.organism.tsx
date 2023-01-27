import React, { useEffect, useState } from 'react';
import { SharingDuration, UseCaseResponse } from '../../generated/consent';
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

export type ConsentCreateFormProps = {
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  dataHandlers?: DataRecipient[];
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentCreateForm = (props: ConsentCreateFormProps) => {
  const { useCase, enablePartnerMessageDiscreetMode = false, dataHandlers, onCancel, onSubmit } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();
  const { primaryDataRecipient } = useDataRecipients();
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
  }, []);

  useEffect(() => {
    if (consentForm.selectedSharingDurations) {
      setShowDateError(false);
    }

    if (consentForm.allAddScopesChecked && consentForm.dataHolder && consentForm.selectedSharingDurations) {
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
      setShowScopeError(consentForm.allAddScopesChecked === true ? false : true);
    }
  };

  const handleScopeChange = (isAllClicked: boolean) => {
    consentForm.allAddScopesChecked = isAllClicked;
    setConsentForm({ ...consentForm });
    setShowScopeError(false);
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
          />

          <ConsentSectionScopes
            message={copy.consent.edit.scope_create_message}
            scopes={useCase.scopes}
            showError={showScopeError}
            onChange={handleScopeChange}
          />

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
