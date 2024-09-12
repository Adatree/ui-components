import React, { useEffect, useState } from 'react';
import { ConsentResponse, ScopeResponse, Status, UseCaseResponse } from '@adatree/react-api-sdk';
import { ConsentSectionScopes } from '../../molecules/consent-section/consent-section-scopes.molecule';
import { Helper } from '../../utils/helper/helper';
import { useCopy } from '../../context/copy.context';
import { useConsentForm } from '../../context/consentForm.context';

export type ConsentEditScopesProps = {
  consent: ConsentResponse;
  useCase: UseCaseResponse;
  showAddScopeError: boolean;
  showRemoveScopeError: boolean;
  onAddScopeChange: (isAllScopesClicked: boolean) => void;
  onRemoveScopeChange: (isAllScopesClicked: boolean) => void;
};

export const ConsentEditScopes = (props: ConsentEditScopesProps) => {
  const { consent, useCase, showAddScopeError, showRemoveScopeError, onAddScopeChange, onRemoveScopeChange } = props;
  const [userConsentedScopes, setUserConsentedScopes] = useState<ScopeResponse[]>([]);
  const [additionalScopes, setAdditionalScopes] = useState<ScopeResponse[]>([]);
  const [removedScopes, setRemovedScopes] = useState<ScopeResponse[]>([]);
  const [form, setForm] = useConsentForm();
  const [copy] = useCopy();

  useEffect(() => {
    if (consent.useCase && consent.useCase.scopes && useCase.scopes) {
      const additional = Helper.getScopeDifference(consent.useCase.scopes, useCase.scopes);
      const removed = Helper.getScopeDifference(useCase.scopes, consent.useCase.scopes);

      if (additional.length === 0) {
        form.allAddScopesChecked = true;
      }
      if (removed.length === 0) {
        form.allRemoveScopesChecked = true;
      }

      setForm({ ...form });
      setAdditionalScopes(additional);
      setRemovedScopes(removed);
      setUserConsentedScopes(consent.useCase.scopes);
    }
  }, []);

  return (
    <section>
      <ConsentSectionScopes
        message={copy.consent.edit.scope_read_only_message}
        readOnly={true}
        scopes={userConsentedScopes}
        showError={false}
      />
      {consent.status === Status.Active && additionalScopes.length >= 1 && (
        <ConsentSectionScopes
          message={copy.consent.edit.scope_additional_message}
          scopes={additionalScopes}
          showError={showAddScopeError}
          onChange={onAddScopeChange}
        />
      )}
      {consent.status === Status.Active && removedScopes.length >= 1 && (
        <ConsentSectionScopes
          message={copy.consent.edit.scope_remove_message}
          scopes={removedScopes}
          showError={showRemoveScopeError}
          onChange={onRemoveScopeChange}
        />
      )}
    </section>
  );
};
