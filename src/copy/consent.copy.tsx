import React from 'react';
import { Highlight as HL } from '../atoms/highlight-text/highlight-text.atom';
import { Copy } from '../types/copy.type';
import { DataRecipient } from '../types/data-recipient.type';

export const consentCopy = (dataRecipient: DataRecipient, providerType: string): Copy['consent'] => {
  return {
    create: {
      consent_label: 'Consent',
      cancel_label: 'Cancel',
      save_label: 'Save',
      cancel_consent_message: 'Are you sure you want to cancel this consent?',
      cancel_edit_message: 'Are you sure you want to cancel editing this consent?',
      data_holder_input_label: `Choose your ${providerType}`,
      data_holder_general_information_list_item: `We will never ask for your ${providerType} login password. Your ${providerType} will send you a one time password.`,
      select_favourite_data_holder_title: `Select your ${providerType}`,
      select_more_data_holder_title: `More ${providerType}s`,
      title: (name: string) => {
        return (
          <>
            <HL>{dataRecipient.name}</HL> requests access to your <HL>{name}</HL> account data
          </>
        );
      },
      trusted_advisors_label: 'Your data will be shared with:',
    },
    edit: {
      active_consent_message: 'Update your consent details',
      non_active_consent_message: (status: string) => {
        return `You are unable to edit your consent because the status is ${status}.`;
      },
      scope_additional_message: (
        <>
          <HL>{dataRecipient.name}</HL> would like access to the following new data:
        </>
      ),
      scope_create_message: (
        <>
          <HL>{dataRecipient.name}</HL> would like access to the following data:
        </>
      ),
      scope_read_only_message: (
        <>
          <HL>{dataRecipient.name}</HL> has access to the following data:
        </>
      ),
      scope_remove_message: (
        <>
          <HL>{dataRecipient.name}</HL> would like to remove access to the following data:
        </>
      ),
      up_to_date_message: 'Your consent details are up to date. There are no options for you to edit.',
    },
    scope: {
      tooltip_label: (
        <>
          <HL>{dataRecipient.name}</HL> will receive access to the following data:
        </>
      ),
    },
  };
};
