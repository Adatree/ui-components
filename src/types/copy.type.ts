import { ReactElement } from 'react';

export interface Copy {
  consent: {
    cancelLabel: string;
    cancelConsentMessage: string;
    cancelEditMessage: string;
    consentLabel: string;
    dataHolderInputLabel: string;
    dataHolderGeneralInformationListItem: string;
    selectFavouriteDataHolderTitle: string;
    selectMoreDataHolderTitle: string;
    saveLabel: string;
    title: string[];
    edit: {
      scope_additional_label: string | ReactElement;
      scope_removal_label: string;
    };
  };
}
