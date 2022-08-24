import * as React from 'react';
import { Typography } from '@mui/material';
import { ScopeResponse } from '../../generated/consent/api';
import { Card } from '../../atoms/card/card.atom';
import { ScopeListSwitch } from '../../atoms/scope-list/scope-list-switch.atom';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { Organisation } from '../../types/organisation.type';

export type ConsentSectionScopesProps = {
  organisation: Organisation;
  scopes: ScopeResponse[];
  showError: boolean;
  onChange: (isAllClicked: boolean) => void;
};

export const ConsentSectionScopes: React.FC<ConsentSectionScopesProps> = (props) => {
  const { organisation, showError, scopes, onChange } = props;

  const handleChange = (isAllClicked: boolean) => {
    onChange(isAllClicked);
  };

  return (
    <>
      <Card error={showError} sx={{ mt: 1 }}>
        <Typography sx={{ mb: 1 }}>
          Please confirm that <Highlight>{organisation.name}</Highlight> can have access to the following data:
        </Typography>
        <ScopeListSwitch scopes={scopes} companyName={organisation.name} onChange={handleChange} />
      </Card>
      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && 'Please select all the options.'}
      </Typography>
    </>
  );
};
