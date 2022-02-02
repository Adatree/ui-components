import React from 'react';
import { Skeleton, Stack, Typography } from '@mui/material';
import { CheckboxAccordion } from '../../atoms/checkbox-accordion/checkbox-accordion.atom';
import { UseCaseResponse } from '../../generated/consent/api';

export type UseCaseScopeListProps = {
  title: string;
  subtitle: string;
  useCase: UseCaseResponse;
  onChange: (isChecked: boolean, value: string) => void;
};

export const UseCaseScopeList = (props: UseCaseScopeListProps) => {
  const { title, subtitle, useCase, onChange } = props;

  return (
    <section>
      <Typography variant="h2" sx={{ mb: 3 }}>
        {title ? title : <Skeleton />}
      </Typography>
      <Typography sx={{ mb: 4 }}>{subtitle ? subtitle : <Skeleton />}</Typography>
      {!useCase && (
        <>
          <Skeleton variant="rectangular" height={128} />
        </>
      )}
      {useCase && useCase.scopes && (
        <Stack justifyContent="center" direction="column" spacing={{ xs: 2, sm: 3, md: 4 }}>
          {useCase.scopes.map((scope, index) => {
            return (
              <CheckboxAccordion
                key={index}
                title={scope.name ? scope.name : 'Scope name not provided'}
                checkboxValue={scope.id ? scope.id : 'Scope ID not provided'}
                checked={false}
                items={scope.claims}
                onChange={onChange}
              />
            );
          })}
        </Stack>
      )}
    </section>
  );
};
