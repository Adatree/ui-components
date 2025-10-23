import React from 'react';
import { Highlight as HL } from '../atoms/highlight-text/highlight-text.atom';
import { LinkExternal } from '../atoms/links/link-external.atom';
import { Copy } from '../types/copy.type';
import { DataRecipient } from '../types/data-recipient.type';
import { Helper } from '../utils/helper/helper';

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
            Speak to {name} for more information about how they will handle your data.{' '}
            {dataHandlingPolicy && (
              <>
                You can view their data handling policy <LinkExternal href={dataHandlingPolicy} text={'here'} />.
              </>
            )}
          </>
        );
      },
      list_non_adr_disclaimer: (name: string) => {
        return (
          <>
            <HL>{name}</HL> only has access to the insight not your {providerType} data used to generate the insight.
            The insight shared with <HL>{name}</HL> is not subject to CDR protections.
          </>
        );
      },

      title: 'Who else has access to my data?',
    },
    data_holder: {
      not_listed: `My ${providerType} is not listed`,
    },
    general_information: {
      list_adr_context: `${primaryDataRecipient.name} use ${adrDataRecipient.name} to help you consent and access your data.`,
      list_cdr_acknowledgement: (dataHandlerName: string) => {
        return (
          <>
            {dataHandlerName} is a CDR Representative of {adrDataRecipient.name}
          </>
        );
      },
      list_cdr_protection: `Data shared with ${primaryDataRecipient.name} is not subject to CDR Protections.`,
      list_ta_acknowledgement: `${primaryDataRecipient.name} is a Trusted Adviser of ${adrDataRecipient.name}.`,
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
      list_deleted_with_insights: `When your consent expires or is revoked, all of the data you shared with ${adrDataRecipient.name} which they are not legally required to keep is automatically deleted within seconds.`,
      list_manage_consent:
        'You can manage your consent through the consent dashboard. A link will be provided to it in your consent receipt.',
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
          You can stop sharing data at any time by pressing the revoke button in the consent record. You can also email{' '}
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
    de_identify: {
      title: (name: string) => {
        if (name === 'EnergyFlex') {
          return 'EnergyFlex requires your consent to combine your anonymised data with that of others in your area in order to calculate average numbers.';
        }
        if (name === 'SunSPOT') {
          return 'SunSPOT would like to save your de-identified data to use for academic research and to improve the accuracy of SunSPOT. This is optional and wont affect your use of SunSPOT.';
        }

        return 'Consent to Use of De-Identified Data';
      },

      tooltip: (text?: string) => {
        if (text) {
          return text;
        }

        return "We'll combine your energy use data with that of others in your neighbourhood to calculate average numbers. These averages help you see how your energy use compares to other households in your area. We'll remove any personal information that could identify you - including your name, contact information, and physical address. The data used to create these averages will not be attributable to you, and you will not be able to elect that it be deleted.";
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
      what_label: (dataRecipients: DataRecipient[]): React.ReactElement => {
        const isBcdc = Helper.isBcdc(dataRecipients);

        return (
          <>
            {isBcdc && (
              <>
                <HL>{primaryDataRecipient.name}</HL> is using <HL>{adrDataRecipient.name}</HL> services to provide
                access to the consent data.
              </>
            )}
            {!isBcdc && (
              <>
                <HL>{primaryDataRecipient.name}</HL> is a CDR Representative of <HL>{adrDataRecipient.name}</HL>.
              </>
            )}
          </>
        );
      },
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
