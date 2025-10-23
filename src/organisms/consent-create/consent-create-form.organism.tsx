import React, { useEffect, useState } from 'react';
import { PostUsageAction, SharingDuration, UseCaseResponse } from '@adatree/react-api-sdk-dashboard';
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
import { ConsentSectionDeIdentify } from '../../molecules/consent-section/consent-section-deletion.molecule';
import { BusinessConsumerStatement } from '../../molecules/business-consumer-statement/business-consumer-statement.molecule';
import { UseCaseFeature } from '../../consts/use-case-features.const';
import { ConsentCreateInsight } from './consent-create-insight.organism';
import { Logger } from '../../utils/logger/logger';

interface Props {
  useCase: UseCaseResponse;
  enablePartnerMessageDiscreetMode?: boolean;
  dataHandlers?: DataRecipient[];
  onCancel: () => void;
  onSubmit: () => void;
}

export const ConsentCreateForm = (props: Props) => {
  const { useCase, enablePartnerMessageDiscreetMode = false, dataHandlers, onCancel, onSubmit } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [deIdentificationCheck, setDeIdentificationCheck] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [showDeIdentifyError, setShowDeIdentifyError] = useState(false);
  const [showDeIdentifySection, setShowDeIdentifySection] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();
  const { primaryDataRecipient, nonAdrDataRecipient, dataRecipients } = useDataRecipients();

  const dataHandlersWithoutPrimary = dataHandlers?.filter((dataRecipient) => {
    return dataRecipient.type !== primaryDataRecipient.type;
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (
      useCase.sharingDurations &&
      useCase.sharingDurations.length === 1 &&
      !useCase.sharingDurations.includes(SharingDuration.Custom)
    ) {
      consentForm.selectedSharingDurations = useCase.sharingDurations[0];
      consentForm.sharingEndDate = Helper.sharingDurationToDate(useCase.sharingDurations[0]);
      setConsentForm({ ...consentForm });
    }

    if (useCase.features?.includes(UseCaseFeature.CDR_INSIGHTS)) {
      setShowInsights(true);
    }

    // @ts-ignore
    if (
      useCase.features &&
      Array.isArray(useCase.features) &&
      useCase.features.includes(UseCaseFeature.DE_IDENTIFICATION)
    ) {
      setPostUsageAction(true);
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
      if (
        primaryDataRecipient.type === DataRecipientType.CDR_REPRESENTATIVE ||
        primaryDataRecipient.type === DataRecipientType.BUSINESS_CONSUMER_DISCLOSURE_CONSENT
      ) {
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
      setPostUsageAction(false);
    }

    setConsentForm({ ...consentForm });
    setShowDeIdentifyError(false);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  const setPostUsageAction = (isChecked: boolean) => {
    // Hardcode rule for SunSpot :(
    if (primaryDataRecipient.name === 'SunSPOT') {
      consentForm.postUsageAction = isChecked ? PostUsageAction.DeIdentification : PostUsageAction.Deletion;
      setDeIdentificationCheck(true);
      Logger.debug('Applying PostUsageAction rule for SunSPOT. Setting value to', consentForm.postUsageAction);
    } else {
      consentForm.postUsageAction = undefined;
    }
  };

  return (
    <section>
      {useCase.dataHolders && useCase.scopes && (
        <>
          {showInsights && nonAdrDataRecipient && (
            <ConsentCreateInsight
              useCase={useCase}
              nonAdrDataRecipient={nonAdrDataRecipient}
              primaryDataRecipient={primaryDataRecipient}
              dataHolderName={consentForm.dataHolder?.brandName === undefined ? ' ' : consentForm.dataHolder?.brandName}
            />
          )}

          {!showInsights && (
            <>
              <ConsentSectionHeader
                dataHolderName={
                  consentForm.dataHolder?.brandName === undefined ? ' ' : consentForm.dataHolder?.brandName
                }
              />
            </>
          )}

          <ConsentSectionScopes
            message={
              showInsights
                ? copy.consent.edit.scope_for_insights_create_message(useCase.name ?? 'to generate the insight')
                : copy.consent.edit.scope_create_message
            }
            scopes={useCase.scopes}
            showError={showScopeError}
            onChange={handleScopeChange}
          />

          {Helper.isBcdc(dataRecipients) && Helper.isOrganisation(useCase) && <BusinessConsumerStatement />}

          {showDeIdentifySection && (
            <ConsentSectionDeIdentify
              showError={showDeIdentifyError}
              deIdentifyTitle={copy.component.de_identify.title(primaryDataRecipient.name)}
              deIdentifyCopy={copy.component.de_identify.tooltip(useCase.anonymisationDetails)}
              checked={deIdentificationCheck}
              onCheck={handleDeIdentifyChange}
            />
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
