import React, { useEffect, useState } from 'react';
import { ConsentResponse, ScopeResponse, Status, UseCaseResponse } from '../../generated/consent';
import { ConsentSectionScopes } from '../../molecules/consent-section/consent-section-scopes.molecule';
import { Helper } from '../../utils/helper/helper';
import { Typography } from '@mui/material';
import { useCopy } from '../../context/copy.context';

export type ConsentEditScopesProps = {
  consent: ConsentResponse;
  useCase: UseCaseResponse;
};

export const ConsentEditScopes = (props: ConsentEditScopesProps) => {
  const { consent, useCase } = props;
  const [userConsentedScopes, setUserConsentedScopes] = useState<ScopeResponse[]>([]);
  const [additionalScopes, setAdditionalScopes] = useState<ScopeResponse[]>([]);
  const [removedScopes, setRemovedScopes] = useState<ScopeResponse[]>([]);
  const [copy] = useCopy();

  useEffect(() => {
    if (consent.useCase && consent.useCase.scopes && useCase.scopes) {
      const additional = Helper.getScopeDifference(consent.useCase.scopes, useCase.scopes);
      const removed = Helper.getScopeDifference(useCase.scopes, consent.useCase.scopes);

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
      {consent.status === Status.ACTIVE && additionalScopes.length >= 1 && (
        <>
          <ConsentSectionScopes
            message={copy.consent.edit.scope_additional_message}
            scopes={additionalScopes}
            showError={false}
          />
        </>
      )}
      {consent.status === Status.ACTIVE && removedScopes.length >= 1 && (
        <>
          <ConsentSectionScopes
            message={copy.consent.edit.scope_remove_message}
            scopes={removedScopes}
            showError={false}
          />
        </>
      )}
    </section>
  );
};
