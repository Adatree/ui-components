import React from 'react';
import { Highlight as HL } from '../atoms/highlight-text/highlight-text.atom';
import { LinkExternal } from '../atoms/links/link-external.atom';
import { Copy } from '../types/copy.type';
import { DataRecipient } from '../types/data-recipient.type';

export const componentCopy = (dataRecipient: DataRecipient, providerType: string): Copy['component'] => {
  return {
    data_handling_info: {
      list_data_policy: (name: string, dataPolicyUrl: string) => {
        return (
          <>
            Find out more information on how your data will be handled by {name}{' '}
            <LinkExternal href={dataPolicyUrl} text="here" />.
          </>
        );
      },
      list_protection_framework: (dataHandlerName: string, protectionFrameworkUrl: string) => {
        return (
          <>
            Your data will be subject to the protections provided under the {dataHandlerName}{' '}
            <LinkExternal href={protectionFrameworkUrl} text={`protection framework policy`} /> rather than the CDR.
          </>
        );
      },
      title: 'Data Handling',
    },
    general_information: {
      list_adr_context: (primaryDataRecipientName: string, adrName: string) =>
        `${primaryDataRecipientName} have partnered with ${adrName} to provider this consumer consent service.`,
      list_deleted:
        'When your consent expires or is revoked, all of the data you shared with us is automatically deleted within seconds.',
      list_marketing: (dataRecipientName: string) =>
        `${dataRecipientName} will never sell your data or use it for marketing.`,
      list_primary_more_info: (cdrPolicyText: string, cdrPolicyUrl: string) => {
        return (
          <>
            Find out more information on how we handle your data in our easy-to-read{' '}
            <LinkExternal href={cdrPolicyUrl} text={cdrPolicyText} />.
          </>
        );
      },
      list_third_party_more_info: (dataHandlerName: string, cdrPolicyText: string, cdrPolicyUrl: string) => {
        return (
          <>
            Find out more information on how {dataHandlerName} handles your data in their{' '}
            <LinkExternal href={cdrPolicyUrl} text={cdrPolicyText} />.
          </>
        );
      },
      list_records:
        'You can request copies of records relating to your consent and the data we collect by writing to us at',
      list_revoked: 'When you revoke consent, the services we offer may cease to provide you with benefits.',
      list_security: (dataRecipientName: string) =>
        `${dataRecipientName} will never ask for your ${providerType} login password. Your ${providerType} will send you a one-time password.`,
      list_sharing:
        'You can stop sharing data at any time by clicking the revoke button in the consent record. You can also write to us at',
      title: 'General information',
      list_complaint: (complaintEmail: string) => {
        return (
          <>
            If you would like to make a complaint, please email us at{' '}
            <LinkExternal href={`mailto:${complaintEmail}`} text={complaintEmail} />.
          </>
        );
      },
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
          <HL>{dataRecipient.name}</HL> use <HL>Adatree</HL> to help you consent and access your data.
        </>
      ),
      why_label: (dataHolderName: string) => {
        return (
          <>
            <HL>{dataHolderName}</HL> will ask you to share your data with <HL>Adatree</HL> for{' '}
            <HL>{dataRecipient.name}</HL>.
          </>
        );
      },
    },
  };
};
