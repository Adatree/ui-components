import React from 'react';
import { Highlight } from '../../../atoms/highlight-text/highlight-text.atom';
import { Copy } from '../../../types/copy.type';
import { Organisation } from '../../../types/organisation.type';

const generateCopy = (org: Organisation): Copy => {
  return {
    consent: {
      consentLabel: 'Consent',
      cancelLabel: 'Cancel',
      saveLabel: 'Save',
      cancelConsentMessage: 'Are you sure you want to cancel this consent?',
      cancelEditMessage: 'Are you sure you want to cancel editing this consent?',
      dataHolderInputLabel: 'Choose your data provider',
      dataHolderGeneralInformationListItem:
        'We will never ask for your Data Holder login password. Your Data Holder will send you a one time password.',
      selectFavouriteDataHolderTitle: 'Select your bank',
      selectMoreDataHolderTitle: 'More banks',
      title: ['requests access to your', 'account data'],
      edit: {
        scope_additional_label: (
          <>
            Add <Highlight>{org.name}</Highlight> some other
          </>
        ),
        scope_removal_label: 'Remove',
      },
    },
  };
};

export const copy = {
  generateCopy,
};
