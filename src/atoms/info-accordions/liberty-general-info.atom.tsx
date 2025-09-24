import React, { ReactElement } from 'react';
import { List, ListItemText, ListItem } from '@mui/material';
import { Accordion } from '../accordion/accordion.molecule';
import { useDataRecipients } from '../../context/data-recipient.context';
import { LinkExternal } from '../links/link-external.atom';

export const LibertyGeneralInformation = () => {
  const { accreditationNumber, primaryDataRecipient } = useDataRecipients();

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
        {renderListItem(
          `We, Liberty Financial, are the accredited recipient (accredited number ${accreditationNumber}) of the data you consent to share.`,
        )}
        {renderListItem(
          'The data has been requested by us for the Liberty loan that you have applied for. This information is required for us to properly in assess your application.',
        )}
        {renderListItem(
          `You can stop sharing data at any time by clicking the revoke button in the consent record. You can also email ${primaryDataRecipient.dataSharingRevocationEmail}`,
        )}
        {renderListItem(
          'If your consent expires or you revoke it, all of the data you have shared with us will be deleted unless you have consented for us to de-identify the data to use for our general research purposes (i.e. to innovate and improve our products, features and services).',
        )}
        {renderListItem(
          'If you consent to your redundant data being de-identified we will ensure to remove any reference to your name, address and bank account details.',
        )}
        {renderListItem(
          'PLEASE NOTE: When you revoke consent to sharing the data, the services offered may cease to provide you with the benefits. This may mean that your loan application will be incomplete as we do not have the information we require to properly assess it.',
        )}
        {renderListItem('We will never ask for your bank login password. Your bank will send you a one time password.')}
        {renderListItem('We will never sell your data or use it for marketing.')}
        {renderListItem(
          `You can request copies of records relating to your consent and the data we collect by writing to us at ${primaryDataRecipient.dataSharingRevocationEmail}`,
        )}
        {renderListItem(
          <>
            Find our more information on how Liberty handles your CDR data here{' '}
            <LinkExternal href={primaryDataRecipient.cdrPolicyUrl} text={'here'} />
          </>,
        )}
        {renderListItem(`If you would like to make a complaint, please email ${primaryDataRecipient.complaintEmail}`)}
      </List>
    );
  };

  return <Accordion title="General information" content={getList()} />;
};
