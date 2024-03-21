import React, { useEffect, useState } from 'react';
import { useConsentForm } from '../../context/consentForm.context';
import { useDataRecipients } from '../../context/data-recipient.context';
import { useCopy } from '../../context/copy.context';
import { ConsentSectionActions } from '../../molecules/consent-section/consent-section-actions.molecule';
import { DataRecipientType } from '../../types/data-recipient.type';
import { InsightConfirmationForm } from '../../molecules/insight-confirmation-form/insight-confirmation-form.molecule';
import { InsightResponse } from '../../types/insight-response.type';

export type ConsentInsightFormProps = {
  insightResponse: InsightResponse;
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentInsightForm = (props: ConsentInsightFormProps) => {
  const { insightResponse, onCancel, onSubmit } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [showInsightsError, setShowInsightsError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();
  const { addDataRecipient } = useDataRecipients();

  useEffect(() => {
    if (insightResponse !== undefined) {
      addDataRecipient({
        cdrPolicyUrl: insightResponse.dataHandlingUrl,
        complaintEmail: '',
        dataSharingRevocationEmail: '',
        description: '',
        logo: '',
        name: insightResponse.nonAccreditedDataRecipient,
        website: '',
        type: DataRecipientType.NON_ACCREDITED_DATA_RECIPIENT,
      });
    }
  }, []);

  useEffect(() => {
    if (consentForm.insightsConfirmation) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [consentForm]);

  const handleCancel = () => {
    onCancel();
  };

  const handlePreSubmit = () => {
    if (isFormValid) {
      handleSubmit();
    } else {
      setShowInsightsError(consentForm.insightsConfirmation === true ? false : true);
    }
  };

  const handleInsightsChange = (isConformed: boolean) => {
    consentForm.insightsConfirmation = isConformed;
    setConsentForm({ ...consentForm });
    setShowInsightsError(false);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <section>
      <InsightConfirmationForm
        insightResponse={insightResponse}
        showError={showInsightsError}
        dataHolderName={consentForm.dataHolder?.brandName === undefined ? ' ' : consentForm.dataHolder?.brandName}
        onChange={handleInsightsChange}
      />

      <ConsentSectionActions
        actionButtonLabel={copy.common.button_label_next}
        cancelButtonLabel={copy.consent.create.cancel_label}
        cancelButtonMessage={copy.consent.create.cancel_consent_message}
        isValid={isFormValid}
        showError={showInsightsError}
        onCancel={handleCancel}
        onSubmit={handlePreSubmit}
      />
    </section>
  );
};
