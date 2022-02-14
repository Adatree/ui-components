import React from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import { ConsentResponse, Status } from '../../generated/consent';
import { ConsentList } from '../../atoms/consent-list/consent-list.atom';
import { List } from '../../utils/list/list';

export type ConsentTabsProps = {
  consents: ConsentResponse[] | undefined;
};

type TabPanelProps = {
  index: number;
  value: number;
  children?: React.ReactNode;
};

export const ConsentTabs: React.FC<ConsentTabsProps> = (props) => {
  const { consents = [] } = props;
  const [value, setValue] = React.useState(0);

  const activeConsents = List.sortListbyDate(List.filterListbyStatus(consents, Status.ACTIVE));
  const expiredConsents = List.sortListbyDate(List.filterListbyStatus(consents, Status.EXPIRED));
  const revokedConsents = List.sortListbyDate(List.filterListbyStatus(consents, Status.REVOKED));

  List.filterListbyStatus(consents, Status.ACTIVE);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (event) {
      setValue(newValue);
    }
  };

  const noConsentItems = (status: string) => {
    return (
      <Typography variant="h5" sx={{ py: 5, textAlign: 'center' }}>
        You do not have any {status.toLocaleLowerCase()} consents.
      </Typography>
    );
  };

  return (
    <Box>
      <AppBar position="static" color="secondary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="Consent tabs"
        >
          <Tab label="Current" {...a11yProps(0)} />
          <Tab label="Expired" {...a11yProps(1)} />
          <Tab label="Revoked" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {activeConsents.length > 0 && <ConsentList consents={activeConsents} />}
        {activeConsents.length === 0 && noConsentItems(Status.ACTIVE)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {expiredConsents.length > 0 && <ConsentList consents={expiredConsents} />}
        {expiredConsents.length === 0 && noConsentItems(Status.EXPIRED)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {revokedConsents.length > 0 && <ConsentList consents={revokedConsents} />}
        {revokedConsents.length === 0 && noConsentItems(Status.REVOKED)}
      </TabPanel>
    </Box>
  );
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`Consent-tabpanel-${index}`}
      aria-labelledby={`Consent-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `Consent-tab-${index}`,
    'aria-controls': `Consent-tabpanel-${index}`,
  };
};