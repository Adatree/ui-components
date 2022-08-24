import * as React from 'react';
import { Typography } from '@mui/material';
import { ScopeResponse } from '../../generated/consent/api';
import { Card } from '../../atoms/card/card.atom';
import { ScopeListSwitch } from '../../atoms/scope-list/scope-list-switch.atom';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { Organisation } from '../../types/organisation.type';
import { ScopeList } from '../../atoms/scope-list/scope-list.atom';

export type ConsentSectionScopesProps = {
  organisation: Organisation;
  scopes: ScopeResponse[];
  showError: boolean;
  readOnly?: boolean;
  onChange?: (isAllClicked: boolean) => void;
};

export const ConsentSectionScopes: React.FC<ConsentSectionScopesProps> = (props) => {
  const { organisation, showError, scopes, readOnly = false, onChange } = props;

  const handleChange = (isAllClicked: boolean) => {
    if (onChange) {
      onChange(isAllClicked);
    }
  };

  return (
    <>
      <Card error={showError} sx={{ mt: 1 }}>
        {readOnly && (
          <>
            <Typography sx={{ mb: 1 }}>
              <Highlight>{organisation.name}</Highlight> has access to the following data:
            </Typography>
            <ScopeList scopes={scopes} companyName={organisation.name} />
          </>
        )}
        {!readOnly && (
          <>
            <Typography sx={{ mb: 1 }}>
              Please confirm that <Highlight>{organisation.name}</Highlight> can have access to the following data:
            </Typography>

            <ScopeListSwitch scopes={scopes} companyName={organisation.name} onChange={handleChange} />
          </>
        )}
      </Card>
      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && readOnly && 'Please select all the options.'}
      </Typography>
    </>
  );
};
