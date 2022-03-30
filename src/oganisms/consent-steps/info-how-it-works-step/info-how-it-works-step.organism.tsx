import React from 'react';
import { Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
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

export type InfoHowItWorksStepProps = {
  dataSharingRevocationEmail: string;
  cdrPolicyUrl: string;
};

export const InfoHowItWorksStep = (props: InfoHowItWorksStepProps) => {
  const { dataSharingRevocationEmail, cdrPolicyUrl } = props;
  return (
    <>
      <section>
        <Typography variant="h2" sx={{ mb: 3 }}>
          How data sharing works
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckboxMultipleMarked color="primary" />
            </ListItemIcon>
            <ListItemText primary="You consent to share your data with us." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <BankCheck color="primary" />
            </ListItemIcon>
            <ListItemText primary="You confirm with your bank that you want to share your data." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Connection color="primary" />
            </ListItemIcon>
            <ListItemText primary="We securely connect to your bank securely using Open Banking." />
          </ListItem>
        </List>
      </section>
      <section>
        <Typography variant="h2" sx={{ mb: 3, mt: 3 }}>
          Key things you should know
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <EyeOff color="primary" />
            </ListItemIcon>
            <ListItemText primary="We will never ask for your bank login password. Your bank will send you a one time password." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CashRemove color="primary" />
            </ListItemIcon>
            <ListItemText primary="We will never sell your data or use it for marketing." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Delete color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography>
                  You can stop sharing data at any time by clicking the revoke button in the consent record. You can
                  also write to us at{' '}
                  <Link href={`mailto:${dataSharingRevocationEmail}`}>{dataSharingRevocationEmail}</Link>. 
                </Typography>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CloseCircle color="primary" />
            </ListItemIcon>
            <ListItemText primary="When your consent expires or is revoked, all of the data you shared with us is automatically deleted within seconds." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CogStop color="primary" />
            </ListItemIcon>
            <ListItemText primary="When you revoke consent, the services we offer may cease to provide you with benefits." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Information color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography>
                  Find out more information on how we handle your data in our easy to read{' '}
                  <Link href={`${cdrPolicyUrl}`}>CDR Policy</Link>.
                </Typography>
              }
            />
          </ListItem>
        </List>
      </section>
    </>
  );
};
