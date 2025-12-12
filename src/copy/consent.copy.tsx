import React from 'react';
import { Highlight as HL } from '../atoms/highlight-text/highlight-text.atom';
import { Copy } from '../types/copy.type';
import { DataRecipient } from '../types/data-recipient.type';

export const consentCopy = (primaryDataRecipient: DataRecipient, providerType: string): Copy['consent'] => {
  return {
    create: {
      consent_label: 'Consent',
      cancel_label: 'Cancel',
      save_label: 'Save',
      cancel_consent_message: 'Are you sure you want to cancel this consent?',
      cancel_edit_message: 'Are you sure you want to cancel editing this consent?',
      data_holder_input_label:
        providerType && providerType.toLowerCase() === 'bank'
          ? `Choose your ${providerType} or non ${providerType} lender`
          : `Choose your ${providerType} provider`,
      select_favourite_data_holder_title: `Select your ${providerType}`,
      select_more_data_holder_title: 'More options',
      title: (name: string) => {
        return (
          <>
            <HL>{primaryDataRecipient.name}</HL> requests access to your <HL>{name}</HL> account data
          </>
        );
      },
      data_handler_label: 'Your data will be shared with:',
    },
    details: {
      data_disclosure_label: 'Data disclosure',
      data_disclosure_message: 'You are sharing your data with the following:',
    },
    edit: {
      active_consent_message: 'Update your consent details',
      non_active_consent_message: (status: string) => {
        return `You are unable to edit your consent because the status is ${status}.`;
      },
      scope_additional_message: (
        <>
          <HL>{primaryDataRecipient.name}</HL> would like access to the following new data:
        </>
      ),
      scope_create_message: (
        <>
          <HL>{primaryDataRecipient.name}</HL> would like access to the following data:
        </>
      ),
      scope_for_insights_create_message: (insight: string) => {
        return (
          <>
            <HL>{primaryDataRecipient.name}</HL> would like access to the following data to {insight.toLowerCase()}:
          </>
        );
      },
      scope_read_only_message: (
        <>
          <HL>{primaryDataRecipient.name}</HL> has access to the following data:
        </>
      ),
      scope_remove_message: (
        <>
          <HL>{primaryDataRecipient.name}</HL> would like to remove access to the following data:
        </>
      ),
      up_to_date_message: 'Your consent details are up to date. There are no options for you to edit.',
    },
    scope: {
      tooltip_label: (
        <>
          <HL>{primaryDataRecipient.name}</HL> will have access to the following data:
        </>
      ),
    },
  };
};
