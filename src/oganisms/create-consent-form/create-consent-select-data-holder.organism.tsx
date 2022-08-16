import React, { useState } from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '../../generated/consent';
import { AutocompleteDropdown } from '../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { useConsentForm } from '../../context/consentForm.context';
import { Helper } from '../../utils/helper/helper';
import { Copy } from '../../types/copy.type';
import { Box, Typography } from '@mui/material';
import { DataHolderTiles } from '../../atoms/data-holder-tiles/data-holder-tiles.atom';

export type CreateConsentSelectDataHolderProps = {
  copy: Copy;
  existingConsents: ConsentResponse[];
  useCase: UseCaseResponse;
  favouriteDataHolders?: DataHolder[];
};

export const CreateConsentSelectDataHolder = (props: CreateConsentSelectDataHolderProps) => {
  const { copy, existingConsents, favouriteDataHolders, useCase } = props;
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();

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
        <Typography variant="h2">{copy.consent.selectFavouriteDataHolderTitle}</Typography>
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
                <Typography variant="h3">{copy.consent.selectMoreDataHolderTitle}</Typography>
              </Box>
            </>
          )}

          <AutocompleteDropdown
            dataHolders={useCase.dataHolders}
            disableDataHolders={disableDataHolders}
            onChange={handleDataHolderChange}
            showError={showDataHolderError}
            label={copy.consent.dataHolderInputLabel}
          />
        </>
      )}
    </>
  );
};
