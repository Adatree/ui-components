import React from 'react';
import { Highlight as HL } from '../../../../atoms/highlight-text/highlight-text.atom';
import { Copy } from '../../../../types/copy.type';
import { Organisation } from '../../../../types/organisation.type';

export const consentCopy = (org: Organisation): Copy['consent'] => {
  return {
    create: {
      consent_label: 'Consent',
      cancel_label: 'Cancel',
      save_label: 'Save',
      cancel_consent_message: 'Are you sure you want to cancel this consent?',
      cancel_edit_message: 'Are you sure you want to cancel editing this consent?',
      data_holder_input_label: 'Choose your data provider',
      data_holder_general_information_list_item:
        'We will never ask for your Data Holder login password. Your Data Holder will send you a one time password.',
      select_favourite_data_holder_title: 'Select your bank',
      select_more_data_holder_title: 'More banks',
      title: (name: string) => {
        return (
          <>
            <HL>{org.name}</HL> requests access to your <HL>{name}</HL> account data
          </>
        );
      },
    },
    edit: {
      active_consent_message: 'Update your consent details',
      non_active_consent_message: (status: string) => {
        return `You are unable to edit your consent because the status is ${status}.`;
      },
      scope_additional_message: (
        <>
          <HL>{org.name}</HL> would like access to the following new data:
        </>
      ),
      scope_create_message: (
        <>
          <HL>{org.name}</HL> would like access to the following data:
        </>
      ),
      scope_read_only_message: (
        <>
          <HL>{org.name}</HL> has access to the following data:
        </>
      ),
      scope_remove_message: (
        <>
          <HL>{org.name}</HL> would like to remove access to the following data:
        </>
      ),
      up_to_date_message: 'Your consent details are up to date. There are no options for you to edit.',
    },
    scope: {
      tooltip_label: (
        <>
          <HL>{org.name}</HL> will receive access to the following data:
        </>
      ),
    },
  };
};