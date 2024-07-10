import React, { useEffect, useState } from 'react';
import { useConsentForm } from '../../context/consentForm.context';
import { useCopy } from '../../context/copy.context';
import { ConsentSectionActions } from '../../molecules/consent-section/consent-section-actions.molecule';
import { InsightConfirmationForm } from '../../molecules/insight-confirmation-form/insight-confirmation-form.molecule';
import { ScopeResponse } from '../../generated/consent';

export type ConsentInsightFormProps = {
  insightScopes: ScopeResponse[];
  onCancel: () => void;
  onSubmit: () => void;
};

export const ConsentInsightForm = (props: ConsentInsightFormProps) => {
  const { insightScopes, onCancel, onSubmit } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [showInsightsError, setShowInsightsError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();

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
        insightScopes={insightScopes}
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
