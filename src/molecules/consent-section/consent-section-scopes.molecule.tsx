import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ScopeResponse } from '../../generated/consent/api';
import { Card } from '../../atoms/card/card.atom';
import { ScopeListSwitch } from '../../atoms/scope-list/scope-list-switch.atom';
import { Highlight } from '../../atoms/highlight-text/highlight-text.atom';
import { ScopeList } from '../../atoms/scope-list/scope-list.atom';
import { useConsentForm } from '../../context/consentForm.context';
import { useOrg } from '../../context/organisation.context';

export type ConsentSectionScopesProps = {
  scopes: ScopeResponse[];
  showError: boolean;
  readOnly?: boolean;
};

export const ConsentSectionScopes: React.FC<ConsentSectionScopesProps> = (props) => {
  const { showError, scopes, readOnly = false } = props;
  const [showScopeError, setShowScopeError] = useState(showError);
  const [consentForm, setConsentForm] = useConsentForm();
  const [organisation] = useOrg();

  useEffect(() => {
    setShowScopeError(showError);
  }, [showError]);

  const handleChange = (isAllClicked: boolean) => {
    consentForm.allScopesChecked = isAllClicked;
    setConsentForm({ ...consentForm });
    setShowScopeError(!isAllClicked);
  };

  return (
    <>
      <Card error={showScopeError} sx={{ mt: 1 }}>
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
        {showScopeError && !readOnly && 'Please select all the options.'}
      </Typography>
    </>
  );
};
