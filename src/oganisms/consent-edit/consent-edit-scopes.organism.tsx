import React from 'react';
import { ConsentResponse, UseCaseResponse } from '../../generated/consent';
import { Organisation } from '../../types/organisation.type';
import { ConsentSectionScopes } from '../../molecules/consent-section/consent-section-scopes.molecule';

export type ConsentEditScopesProps = {
  consent: ConsentResponse;
  organisation: Organisation;
  useCase: UseCaseResponse;
};

export const ConsentEditScopes = (props: ConsentEditScopesProps) => {
  const { organisation, useCase } = props;

  return (
    <section>
      {useCase.scopes && (
        <ConsentSectionScopes organisation={organisation} readOnly={true} scopes={useCase.scopes} showError={false} />
      )}
    </section>
  );
};
