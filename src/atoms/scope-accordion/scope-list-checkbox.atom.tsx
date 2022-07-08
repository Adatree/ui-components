import React, { useState } from 'react';
import { List } from '@mui/material';
import { ScopeResponse } from '../../generated/consent';
import { CheckboxAccordion } from '../checkbox-accordion/checkbox-accordion.atom';

export type ScopeListProps = {
  scopes: ScopeResponse[];
  companyName: string;
  onChange: (isAllClicked: boolean) => void;
};

export const ScopeListCheckbox: React.FC<ScopeListProps> = (props) => {
  const { scopes, companyName, onChange } = props;
  const [clickedValues, setclickedValues] = useState<string[]>([]);

  const handleChexboxClick = (isChecked: boolean, value: string) => {
    let tmpArray = clickedValues;

    if (isChecked) {
      tmpArray.push(value);
      setclickedValues([...tmpArray]);
    } else {
      tmpArray = tmpArray.filter((item) => item !== value);
      setclickedValues([...tmpArray]);
    }

    onChange(tmpArray.length === scopes.length);
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {scopes.map((scope: ScopeResponse) => {
          return (
            <li key={scope.id}>
              <CheckboxAccordion
                title={scope.name === undefined ? '' : scope.name}
                checkboxValue={scope.id === undefined ? '' : scope.id}
                onChange={handleChexboxClick}
                items={scope.claims}
                subtitle={`
              ${scope.purpose}


              ${companyName} will receive access to the following information:
              `}
              />
            </li>
          );
        })}
      </List>
    </>
  );
};
