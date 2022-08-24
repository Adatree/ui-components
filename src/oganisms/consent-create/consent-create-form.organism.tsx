import React, { useEffect, useState } from 'react';
import { SharingDuration, UseCaseResponse } from '../../generated/consent';
import { useConsentForm } from '../../context/consentForm.context';
import { Helper } from '../../utils/helper/helper';
import { Organisation } from '../../types/organisation.type';
import { Copy } from '../../types/copy.type';
import { ConsentSectionHeader } from '../../molecules/consent-section/consent-section-header.molecule';
import { ConsentSectionScopes } from '../../molecules/consent-section/consent-section-scopes.molecule';
import { ConsentSectionDates } from '../../molecules/consent-section/consent-section-dates.molecule';
import { ConsentSectionInfo } from '../../molecules/consent-section/consent-section-info.molecule';
import { ConsentSectionActions } from '../../molecules/consent-section/consent-section-actions.molecule';
import { PartnerMessageDialog } from '../../molecules/partner-message-dialog/partner-message-dialog.molecule';

export type ConsentCreateFormProps = {
  copy: Copy;
  organisation: Organisation;
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentCreateForm = (props: ConsentCreateFormProps) => {
  const { copy, organisation, useCase, enablePartnerMessageDiscreetMode = false, onCancel, onSubmit } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAllCheckboxChecked, setIsAllCheckboxChecked] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();

  useEffect(() => {
    if (
      useCase.sharingDurations &&
      useCase.sharingDurations.length === 1 &&
      !useCase.sharingDurations.includes(SharingDuration.CUSTOM)
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

    if (isAllCheckboxChecked && consentForm.dataHolder && consentForm.selectedSharingDurations) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isAllCheckboxChecked, consentForm]);

  const handleScopeChange = (isAllChecked: boolean) => {
    setShowScopeError(false);
    setIsAllCheckboxChecked(isAllChecked);
  };

  const handlePartnerDialogClose = () => {
    setIsPartnerDialogOpen(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handlePreSubmit = () => {
    setIsPartnerDialogOpen(false);

    if (isFormValid) {
      if (organisation.underCdrPrincipal) {
        setIsPartnerDialogOpen(true);
      } else {
        handleSubmit();
      }
    } else {
      setShowDataHolderError(!consentForm.dataHolder);
      setShowDateError(!consentForm.selectedSharingDurations);
      setShowScopeError(isAllCheckboxChecked === true ? false : true);
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && (
        <>
          <ConsentSectionHeader
            copy={copy}
            dataHolderName={consentForm.dataHolder?.brandName === undefined ? ' ' : consentForm.dataHolder?.brandName}
            organisation={organisation}
          />

          <ConsentSectionScopes
            organisation={organisation}
            scopes={useCase.scopes}
            showError={showScopeError}
            onChange={handleScopeChange}
          />

          <ConsentSectionDates organisation={organisation} useCase={useCase} showError={showDateError} />

          <ConsentSectionInfo copy={copy} organisation={organisation} useCase={useCase} />

          <ConsentSectionActions
            copy={copy}
            organisation={organisation}
            isValid={isFormValid}
            showError={showDataHolderError || showDateError || showScopeError}
            onCancel={handleCancel}
            onSubmit={handlePreSubmit}
          />
        </>
      )}

      <PartnerMessageDialog
        dataHolderName={consentForm.dataHolder ? consentForm.dataHolder?.brandName : 'Your data provider'}
        discreetMode={enablePartnerMessageDiscreetMode}
        isOpen={isPartnerDialogOpen}
        organisation={organisation}
        onClose={handlePartnerDialogClose}
        onSubmit={handleSubmit}
      />
    </section>
  );
};
