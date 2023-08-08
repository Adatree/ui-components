import React, { useState } from 'react';
import { DataHolder, UseCaseResponse } from '../../generated/consent';
import { AutocompleteDropdown } from '../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { useConsentForm } from '../../context/consentForm.context';
import { Box, Button, Typography } from '@mui/material';
import { DataHolderTiles } from '../../atoms/data-holder-tiles/data-holder-tiles.atom';
import { useCopy } from '../../context/copy.context';
import { Logger } from '../../utils/logger/logger';
import { BlockedDataholderDialog } from '../../molecules/blocked-dataholder-dialog/blocked-dataholder-dialog.molecule';

export type ConsentInputDataHolderProps = {
  disableDataHolders: DataHolder[];
  useCase: UseCaseResponse;
  onCancel: () => void;
  favouriteDataHolders?: DataHolder[];
  blockedDataHolderList?: DataHolder[];
  onNotListedClick?: () => void;
};

export const ConsentInputDataHolder = (props: ConsentInputDataHolderProps) => {
  const {
    disableDataHolders,
    favouriteDataHolders,
    useCase,
    blockedDataHolderList = [],
    onNotListedClick,
    onCancel,
  } = props;
  const [showDataHolderError, setShowDataHolderError] = useState(false);
  const [consentForm, setConsentForm] = useConsentForm();
  const [copy] = useCopy();

  const [blockedDataHolder, setBlockedDataHolder] = useState<DataHolder | undefined>(undefined);
  const [isblockedDialogOpen, setBlockedDialogOpen] = useState(false);

  const isDataHolderBlocked = (dataHolder: DataHolder): boolean => {
    const isBlocked =
      blockedDataHolderList.length >= 1 &&
      blockedDataHolderList.filter((blocked) => dataHolder.dataHolderBrandId === blocked.dataHolderBrandId).length > 0;

    return isBlocked;
  };

  const handleDataHolderChange = (dataHolder: DataHolder | null) => {
    if (dataHolder === null) {
      consentForm.dataHolder = undefined;
    } else if (dataHolder.dataHolderBrandId === 'not-listed') {
      if (onNotListedClick) {
        onNotListedClick();
      }
    } else if (isDataHolderBlocked(dataHolder)) {
      Logger.warn(
        `Data holder blocking enabled for ${dataHolder.brandName}, full list of blocked IDs`,
        blockedDataHolderList,
      );
      setBlockedDataHolder(dataHolder);
      setBlockedDialogOpen(true);
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
          {favouriteDataHolders && favouriteDataHolders.length > 0 && (
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

          {blockedDataHolderList.length >= 1 && blockedDataHolder && (
            <BlockedDataholderDialog
              dataHolder={blockedDataHolder}
              isOpen={isblockedDialogOpen}
              onClose={(): void => {
                setBlockedDialogOpen(false);
                setBlockedDataHolder(undefined);
              }}
            />
          )}
        </>
      )}

      <Button variant="outlined" color="inherit" onClick={onCancel} sx={{ mt: 2 }}>
        Cancel
      </Button>
    </>
  );
};
