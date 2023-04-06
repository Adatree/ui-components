import React from 'react';
import { Highlight as HL } from '../atoms/highlight-text/highlight-text.atom';
import { LinkExternal } from '../atoms/links/link-external.atom';
import { Copy } from '../types/copy.type';
import { DataRecipient } from '../types/data-recipient.type';

export const componentCopy = (
  adrDataRecipient: DataRecipient,
  primaryDataRecipient: DataRecipient,
  providerType: string,
): Copy['component'] => {
  return {
    blocked_dataholder: {
      message: (name: string) => {
        return (
          <>
            Unfortunately, we could not connect you to <HL>{name}</HL>.
          </>
        );
      },
      reason: (name: string) => {
        return (
          <>
            <HL>{name}</HL> have not fully implemented the data sharing feature as part of the Consumer Data Right (CDR)
            specifications.
          </>
        );
      },
      action: (name: string) => {
        return (
          <>
            Please contact <HL>{name}</HL> to enquire about when they will be able to fully support sharing your data.
          </>
        );
      },
    },
    data_handling_info: {
      list_data_policy: (name: string, dataHandlingPolicy?: string) => {
        return (
          <>
            Speak to <HL>{name}</HL> for more information about how they will handle your data.{' '}
            {dataHandlingPolicy && (
              <>
                You can view their data handling policy <LinkExternal href={dataHandlingPolicy} text={'here'} />
              </>
            )}
            .
          </>
        );
      },
      list_non_adr_disclaimer: (name: string) => {
        return (
          <>
            The data shared with <HL>{name}</HL> is not subject to CDR protections.
          </>
        );
      },

      title: 'Who else has access to my data?',
    },
    general_information: {
      list_adr_context: `${primaryDataRecipient.name} use ${adrDataRecipient.name} to help you consent and access your data.`,
      list_cdr_protection: `Data shared with ${primaryDataRecipient.name} is not subject to CDR Protections.`,
      list_complaint: (
        <>
          If you would like to make a complaint, please email{' '}
          <LinkExternal
            href={`mailto:${primaryDataRecipient.complaintEmail}`}
            text={primaryDataRecipient.complaintEmail}
          />
          .
        </>
      ),
      list_deleted: `When your consent expires or is revoked, all of the data you shared with ${adrDataRecipient.name} is automatically deleted within seconds.`,
      list_marketing: (dataRecipientName: string) =>
        `${dataRecipientName} will never sell your data or use it for marketing.`,
      list_primary_more_info: (
        <>
          Find out more information on how {primaryDataRecipient.name} handle your data{' '}
          <LinkExternal href={primaryDataRecipient.cdrPolicyUrl} text="here" />.
        </>
      ),
      list_records: (
        <>
          You can request copies of records relating to your consent and the data collected by emailing{' '}
          <LinkExternal
            href={`mailto:${primaryDataRecipient.dataSharingRevocationEmail}`}
            text={primaryDataRecipient.dataSharingRevocationEmail}
          />
          .
        </>
      ),
      list_records_with_insights: (
        <>
          You can request copies of records relating to your consent, the data collected and any insights disclosed by
          emailing{' '}
          <LinkExternal
            href={`mailto:${primaryDataRecipient.dataSharingRevocationEmail}`}
            text={primaryDataRecipient.dataSharingRevocationEmail}
          />
          .
        </>
      ),
      list_revoked: 'When you revoke consent, the services offered may cease to provide you with benefits.',
      list_security: (dataRecipientName: string) =>
        `${dataRecipientName} will never ask for your ${providerType} login password. Your ${providerType} will send you a one-time password.`,
      list_sharing: (
        <>
          You can stop sharing data at any time by clicking the revoke button in the consent record. You can also email{' '}
          <LinkExternal
            href={`mailto:${primaryDataRecipient.dataSharingRevocationEmail}`}
            text={primaryDataRecipient.dataSharingRevocationEmail}
          />
          .
        </>
      ),
      list_tasp_context: (taspDataRecipient: DataRecipient) =>
        `${taspDataRecipient.name} will facilitate the collection of your data on behalf of ${primaryDataRecipient.name}.`,
      list_third_party_more_info: (dataHandlerName: string, cdrPolicyUrl: string) => {
        return (
          <>
            Find out more information on how {dataHandlerName} handles your data{' '}
            <LinkExternal href={cdrPolicyUrl} text="here" />.
          </>
        );
      },
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
          <HL>{primaryDataRecipient.name}</HL> use <HL>{adrDataRecipient.name}</HL> to help you consent and access your
          data.
        </>
      ),
      why_label: (dataHolderName: string) => {
        return (
          <>
            <HL>{dataHolderName}</HL> will ask you to share your data with <HL>{adrDataRecipient.name}</HL> for{' '}
            <HL>{primaryDataRecipient.name}</HL>.
          </>
        );
      },
    },
  };
};
