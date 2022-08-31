import React, { useEffect, useState } from 'react';
import { ConsentResponse, ScopeResponse, Status, UseCaseResponse } from '../../generated/consent';
import { Organisation } from '../../types/organisation.type';
import { ConsentSectionScopes } from '../../molecules/consent-section/consent-section-scopes.molecule';
import { Helper } from '../../utils/helper/helper';
import { Typography } from '@mui/material';
import { useCopy } from '../../context/copy.context';

export type ConsentEditScopesProps = {
  consent: ConsentResponse;
  organisation: Organisation;
  useCase: UseCaseResponse;
};

export const ConsentEditScopes = (props: ConsentEditScopesProps) => {
  const { consent, organisation, useCase } = props;
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
        organisation={organisation}
        readOnly={true}
        scopes={userConsentedScopes}
        showError={false}
      />
      {consent.status === Status.ACTIVE && additionalScopes.length >= 1 && (
        <>
          <Typography>{copy.consent.edit.scope_additional_label}</Typography>
          <ConsentSectionScopes organisation={organisation} scopes={additionalScopes} showError={false} />
        </>
      )}
      {consent.status === Status.ACTIVE && removedScopes.length >= 1 && (
        <>
          <Typography>{copy.consent.edit.scope_removal_label}</Typography>
          <ConsentSectionScopes organisation={organisation} scopes={removedScopes} showError={false} />
        </>
      )}
    </section>
  );
};
