import React, { ReactElement } from 'react';
import { List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { useDataRecipients } from '../../context/data-recipient.context';
import { LinkExternal } from '../links/link-external.atom';

export const D2cGeneralInformation = () => {
  const { adrDataRecipient, primaryDataRecipient } = useDataRecipients();

  const renderListItem = (text: ReactElement | string): ReactElement => {
    return (
      <ListItem
        sx={{
          py: '4px',
          pl: '0.5rem',
          display: 'list-item',
          ml: '2rem',
          listStyle: 'disc',
          width: 'calc(100% - 2rem)',
        }}
      >
        <ListItemText primary={text} />
      </ListItem>
    );
  };

  const getList = (): ReactElement => {
    return (
      <List sx={{ wordBreak: 'break-word' }}>
        {
          <>
            {renderListItem(
              `You confirm the account that you hold with ${primaryDataRecipient.name} as the location for ${adrDataRecipient.name} to disclose CDR data under CDR Rule 7.5(1)(d). ${adrDataRecipient.name} sends your CDR data to your account with the ${primaryDataRecipient.name} in accordance with your instruction.`,
            )}
            {renderListItem(
              `The disclosure by ${adrDataRecipient.name}, an accredited data recipient, is made to your account held by ${primaryDataRecipient.name}, a third party.`,
            )}
            {renderListItem(
              `You confirm that you have direct access to your account with ${primaryDataRecipient.name}.`,
            )}
            {renderListItem(
              `${primaryDataRecipient.name} will never ask for your login password. Your bank will send you a one-time password.`,
            )}
            {renderListItem(
              `${primaryDataRecipient.name} uses ${adrDataRecipient.name} to help you consent and share your data with your nominated account that is held with them.`,
            )}
            {renderListItem(
              `${adrDataRecipient.name} does not store copies of your data and is required to comply with all relevant obligations in relation to your data, including the Privacy Safeguards.`,
            )}
            {renderListItem(
              <>
                You can stop sharing data at any time by pressing the revoke button in the consent record. You can also
                email{' '}
                <LinkExternal
                  href={`mailto:${primaryDataRecipient.dataSharingRevocationEmail}`}
                  text={primaryDataRecipient.dataSharingRevocationEmail}
                />
                .
              </>,
            )}
            {renderListItem(
              `When your consent expires or is revoked, the services offered may cease to provide you with benefits.`,
            )}
            {renderListItem(
              <>
                You can request copies of records relating to your consent and the data collected by emailing{' '}
                <LinkExternal
                  href={`mailto:${primaryDataRecipient.dataSharingRevocationEmail}`}
                  text={primaryDataRecipient.dataSharingRevocationEmail}
                />
                .
              </>,
            )}
            {renderListItem(
              <>
                Find out more information on how {primaryDataRecipient.name} handles your data{' '}
                <LinkExternal href={`${primaryDataRecipient.cdrPolicyUrl}`} text={'here'} />.
              </>,
            )}
            {renderListItem(
              <>
                If you would like to make a complaint to the ADR, please email{' '}
                <LinkExternal
                  href={`mailto:${adrDataRecipient.complaintEmail}`}
                  text={adrDataRecipient.complaintEmail}
                />
                .
              </>,
            )}
            {renderListItem(
              <>
                If you would like to make a complaint about the account or services provided by the
                {primaryDataRecipient.name}, please contact{' '}
                <LinkExternal
                  href={`mailto:${primaryDataRecipient.complaintEmail}`}
                  text={primaryDataRecipient.complaintEmail}
                />
                .
              </>,
            )}
            {renderListItem(
              `You can manage your consent through the consent dashboard. A link will be provided to it in your consent receipt.`,
            )}
            {renderListItem(
              `The data that you share with your nominated account at ${primaryDataRecipient.name} is not subject to CDR protections.`,
            )}
          </>
        }
      </List>
    );
  };

  return <Accordion title={'General information'} content={getList()} />;
};
