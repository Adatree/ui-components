import React from 'react';
import { Highlight as HL } from '../../../atoms/highlight-text/highlight-text.atom';
import { Copy } from '../../../types/copy.type';
import { Organisation } from '../../../types/organisation.type';

const generateCopy = (org: Organisation): Copy => {
  return {
    common: {
      accredited_recipient_label: 'Accredited Data Recipient:',
      adatree_name: 'Adatree',
      button_label_back: 'Back',
      button_label_no: 'No',
      button_label_yes: 'Yes',
      cdr_policy_label: 'CDR Policy',
      cdr_principal_label: 'Under CDR Principal:',
      status_active_label: 'granted:',
      status_expired_label: 'expired:',
      status_requested_label: 'requested:',
      status_revoked_label: 'revoked:',
    },
    consent: {
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
        scope_additional_label: (
          <>
            Add <HL>{org.name}</HL> some other
          </>
        ),
        scope_removal_label: 'Remove',
      },
      scope: {
        tooltip_label: (
          <>
            <HL>{org.name}</HL> will receive access to the following information:
          </>
        ),
      },
    },
    component: {
      general_information: {
        list_deleted:
          'When your consent expires or is revoked, all of the data you shared with us is automatically deleted within seconds.',
        list_marketing: 'We will never sell your data or use it for marketing.',
        list_more: 'Find out more information on how we handle your data in our easy to read',
        list_records:
          'You can request copies of records relating to your consent and the data we collect by writing to us at',
        list_revoked: 'When you revoke consent, the services we offer may cease to provide you with benefits.',
        list_security: 'We will never ask for your bank login password. Your bank will send you a one time password.',
        list_sharing:
          'You can stop sharing data at any time by clicking the revoke button in the consent record. You can also write to us at',
        title: 'General information',
      },
      max_account_connected_message: {
        list_label: 'You currently have the following active consents:',
        list_item: (useCaeName: string, dataHolderName: string) => {
          return `${useCaeName} consent with ${dataHolderName}`;
        },
        sub_title: 'You have already connected all of your available accounts.',
        title: 'Sorry but you are unable to create a new consent.',
      },
      partner_message: {
        discreet_label: 'consent service provided by',
        what_label: (
          <>
            <HL>{org.name}</HL> use <HL>Adatree</HL> to help you consent and access your data.
          </>
        ),
        why_label: (dataHolderName: string) => {
          return (
            <>
              <HL>{dataHolderName}</HL> will ask you to share your data with <HL>Adatree</HL> for <HL>{org.name}</HL>.
            </>
          );
        },
      },
    },
    error: {
      required: 'This field is required.',
    },
  };
};

export const copy = {
  generateCopy,
};
