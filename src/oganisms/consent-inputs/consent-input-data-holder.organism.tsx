import React, { useState } from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '../../generated/consent';
import { AutocompleteDropdown } from '../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { useConsentForm } from '../../context/consentForm.context';
import { Helper } from '../../utils/helper/helper';
import { Box, Typography } from '@mui/material';
import { DataHolderTiles } from '../../atoms/data-holder-tiles/data-holder-tiles.atom';
import { useCopy } from '../../context/copy.context';

export type ConsentInputDataHolderProps = {
  existingConsents: ConsentResponse[];
  useCase: UseCaseResponse;
  favouriteDataHolders?: DataHolder[];
};

export const ConsentInputDataHolder = (props: ConsentInputDataHolderProps) => {
  const { existingConsents, favouriteDataHolders, useCase } = props;
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();

  const disableDataHolders = Helper.filterDataHoldersByConsentsAndUseCase(
    useCase.dataHolders,
    existingConsents,
    useCase,
  );

  const handleDataHolderChange = (dataHolder: DataHolder | null) => {
    if (dataHolder === null) {
      consentForm.dataHolder = undefined;
    } else {
      setShowDataHolderError(false);
      consentForm.dataHolder = dataHolder;
    }

    setConsentForm({ ...consentForm });
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h2">{copy.consent.create.select_favourite_data_holder_title}</Typography>
      </Box>

      {useCase.dataHolders && (
        <>
          {favouriteDataHolders && (
            <>
              <DataHolderTiles
                dataHolders={favouriteDataHolders}
                onClick={handleDataHolderChange}
                disableDataHolders={disableDataHolders}
              />

              <Box sx={{ mt: 3, mb: 1 }}>
                <Typography variant="h3">{copy.consent.create.select_more_data_holder_title}</Typography>
              </Box>
            </>
          )}

          <AutocompleteDropdown
            dataHolders={useCase.dataHolders}
            disableDataHolders={disableDataHolders}
            onChange={handleDataHolderChange}
            showError={showDataHolderError}
            label={copy.consent.create.data_holder_input_label}
          />
        </>
      )}
    </>
  );
};
