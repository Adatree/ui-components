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

  const disableDataHolders = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, existingConsents, useCase);

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

      {dataHolders.length > disableDataHolders.length && (
        <>
          <AutocompleteDropdown
            dataHolders={dataHolders}
            disableDataHolders={disableDataHolders}
            onChange={handleDataHoldersChange}
            defaultValue={dataHolder}
          />
        </>
      )}
      {dataHolders.length === disableDataHolders.length && (
        <>
          {dataHolders.map((dataHolder) => (
            <Typography sx={{ m: 2 }} key={dataHolder.dataHolderBrandId}>
              You already have an active{' '}
              <Link href={`${consentUrl}`} color="inherit">
                {useCase.name}
              </Link>{' '}
              consent with {dataHolder.brandName}.
            </Typography>
          ))}
        </>
      )}
    </section>
  );
};
