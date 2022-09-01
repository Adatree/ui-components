import React from 'react';
import { Highlight as HL } from '../../../../atoms/highlight-text/highlight-text.atom';
import { Copy } from '../../../../types/copy.type';
import { Organisation } from '../../../../types/organisation.type';

export const componentCopy = (org: Organisation): Copy['component'] => {
  return {
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
  };
};
