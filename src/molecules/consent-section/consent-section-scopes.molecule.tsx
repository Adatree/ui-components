import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { ScopeResponse } from '@adatree/react-api-sdk-dashboard';
import { Card } from '../../atoms/card/card.atom';
import { ScopeListSwitch } from '../../atoms/scope-list/scope-list-switch.atom';
import { ScopeList } from '../../atoms/scope-list/scope-list.atom';

interface Props {
  message: string | ReactElement;
  scopes: ScopeResponse[];
  showError: boolean;
  readOnly?: boolean;
  onChange?: (isAllClicked: boolean) => void;
}

export const ConsentSectionScopes = (props: Props) => {
  const { message, showError, scopes, readOnly = true, onChange } = props;

  const handleChange = (isAllClicked: boolean) => {
    if (onChange) {
      onChange(isAllClicked);
    }
  };

  return (
    <>
      <Card error={showError} sx={{ mt: 1 }}>
        <Typography sx={{ mb: 1 }}>{message}</Typography>
        {readOnly && <ScopeList scopes={scopes} />}
        {!readOnly && <ScopeListSwitch scopes={scopes} onChange={handleChange} />}
      </Card>
      <Typography sx={{ mb: 1, minHeight: '2.2rem' }} variant="body2" color="error.main">
        {showError && !readOnly && 'Please select all the options.'}
      </Typography>
    </>
  );
};
