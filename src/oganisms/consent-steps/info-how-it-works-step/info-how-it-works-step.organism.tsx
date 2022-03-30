import React from 'react';
import { List, Typography } from '@mui/material';
import {
  BankCheck,
  CheckboxMultipleMarked,
  CloseCircle,
  Connection,
  CogStop,
  CashRemove,
  Delete,
  EyeOff,
  Information,
} from 'mdi-material-ui';
import { IconListItem } from '../../../atoms/icon-list-item/icon-list-item.atom';

export type InfoHowItWorksStepProps = {
  dataSharingRevocationEmail: string;
  cdrPolicyUrl: string;
};

export const InfoHowItWorksStep = (props: InfoHowItWorksStepProps) => {
  const { dataSharingRevocationEmail, cdrPolicyUrl } = props;
  return (
    <>
      <section>
        <Typography variant="h2" sx={{ mb: 2 }}>
          How data sharing works
        </Typography>

        <List>
          <IconListItem
            icon={<CheckboxMultipleMarked color="primary" />}
            content="You consent to share your data with us."
          />
          <IconListItem
            icon={<BankCheck color="primary" />}
            content="You confirm with your bank that you want to share your data."
          />
          <IconListItem
            icon={<Connection color="primary" />}
            content="We securely connect to your bank and retrieve your data."
          />
        </List>
      </section>

      <section>
        <Typography variant="h2" sx={{ mb: 2, mt: 2 }}>
          Key things you should know
        </Typography>

        <List>
          <IconListItem
            icon={<EyeOff color="primary" />}
            content="We will never ask for your bank login password. Your bank will send you a one time password."
          />
          <IconListItem
            icon={<CashRemove color="primary" />}
            content="We will never sell your data or use it for marketing."
          />
          <IconListItem
            icon={<Delete color="primary" />}
            content={
              <Typography>
                You can stop sharing data at any time by clicking the revoke button in the consent record. You can also
                write to us at{' '}
                <a target="_blank" href={`mailto:${dataSharingRevocationEmail}`}>
                  {dataSharingRevocationEmail}
                </a>
                .
              </Typography>
            }
          />
          <IconListItem
            icon={<CloseCircle color="primary" />}
            content="When your consent expires or is revoked, all of the data you shared with us is automatically deleted within seconds."
          />
          <IconListItem
            icon={<CogStop color="primary" />}
            content="When you revoke consent, the services we offer may cease to provide you with benefits."
          />
          <IconListItem
            icon={<Information color="primary" />}
            content={
              <Typography>
                Find out more information on how we handle your data in our easy to read{' '}
                <a target="_blank" href={`${cdrPolicyUrl}`}>
                  CDR Policy
                </a>
                .
              </Typography>
            }
          />
        </List>
      </section>
    </>
  );
};
