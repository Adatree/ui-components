import React, { useState } from 'react';
import { ConsentResponse, DataHolder, UseCaseResponse } from '../../generated/consent';
import { AutocompleteDropdown } from '../../atoms/autocomplete-dropdown/autocomplete-dropdown.atom';
import { useConsentForm } from '../../context/consentForm.context';
import { Helper } from '../../utils/helper/helper';
import { Copy } from '../../types/copy.type';

export type CreateConsentSelectDataHolderProps = {
  copy: Copy;
  existingConsents: ConsentResponse[];
  useCase: UseCaseResponse;
};

export const CreateConsentSelectDataHolder = (props: CreateConsentSelectDataHolderProps) => {
  const { copy, existingConsents, useCase } = props;
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
      {useCase.dataHolders && (
        <AutocompleteDropdown
          dataHolders={useCase.dataHolders}
          disableDataHolders={disableDataHolders}
          onChange={handleDataHolderChange}
          showError={showDataHolderError}
          label={copy.consent.dataHolderInputLabel}
        />
      )}
    </>
  );
};
