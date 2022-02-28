import React, { useState } from 'react';
import { Link, Typography } from '@mui/material';
import { AutocompleteDropdown } from '../../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { DataHolder } from '../../../generated/consent/api';
import { useConsentForm } from '../../../context/consentForm.context';
import { ConsentResponse, UseCaseResponse } from '../../../generated/consent';
import { Helper } from '../../../utils/helper/helper';

export type DataHolderStepProps = {
  dataHolders: DataHolder[];
  existingConsents: ConsentResponse[];
  useCase: UseCaseResponse;
  consentUrl: string;
  isValid: (isValid: boolean) => void;
};

export const DataHolderStep = (props: DataHolderStepProps) => {
  const { dataHolders, existingConsents, useCase, consentUrl, isValid } = props;
  const [consentForm, setConsentForm] = useConsentForm();
  const [dataHolder] = useState(consentForm.dataHolder);

  const filteredDataHolders = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, existingConsents, useCase);

  const handleDataHoldersChange = (dataHolder: DataHolder | null) => {
    if (dataHolder) {
      consentForm.dataHolder = dataHolder;
      setConsentForm({ ...consentForm });
    } else {
      consentForm.dataHolder = undefined;
      setConsentForm({ ...consentForm });
    }

    isStepValid();
  };

  const isStepValid = () => {
    isValid(!!consentForm.dataHolder);
  };

  return (
    <section>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Connect your bank
      </Typography>

      {filteredDataHolders.length > 0 && (
        <>
          <AutocompleteDropdown
            dataHolders={filteredDataHolders}
            onChange={handleDataHoldersChange}
            defaultValue={dataHolder}
          />

          <Typography variant="h3" sx={{ mt: 5 }}>
            Why is my bank not listed?
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Every bank in Australia must eventually join the Consumer Data Right but not every bank has their systems
            ready to connect. New banks are joining all the time. If your bank is not listed you have the right to
            enquire with them as to when they will be ready.
          </Typography>
        </>
      )}
      {filteredDataHolders.length === 0 && (
        <>
          {dataHolders.map((dataHolder) => (
            <Typography sx={{ m: 2 }} key={dataHolder.dataHolderBrandId}>
              You already have an active <Link href={`${consentUrl}`}>{useCase.name}</Link> consent with{' '}
              {dataHolder.brandName}.
            </Typography>
          ))}
        </>
      )}
    </section>
  );
};
