import React from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Skeleton } from '@mui/material';
import { ConsentList } from '../../atoms/consent-list/consent-list.atom';
import { Card } from '../../atoms/card/card.atom';
import { ConsentResponse, Status } from '@adatree/react-api-sdk-dashboard';

type PaginationModel = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
};

interface Props {
  activeConsents: ConsentResponse[] | undefined;
  expiredConsents: ConsentResponse[] | undefined;
  revokedConsents: ConsentResponse[] | undefined;
  isLoading?: boolean;
  urlPrefix?: string;
  pagination: PaginationModel;
  onChange: (tabIndex: number, tabListPage: number) => void;
}

type TabPanelProps = {
  index: number;
  value: number;
  children?: React.ReactNode;
};

export const ConsentTabs = ({
  activeConsents = [],
  expiredConsents = [],
  revokedConsents = [],
  isLoading = false,
  urlPrefix = '/consent/',
  pagination,
  onChange,
}: Props) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleTabChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    event.stopPropagation();
    setTabIndex(newTabIndex);
    onChange(newTabIndex, paginationPage);
  };

  const handlePaginationChange = (page: number) => {
    setPaginationPage(page);
    onChange(tabIndex, page);
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
      <AppBar position="static" color="primary">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="Consent tabs"
        >
          <Tab label="Current" {...a11yProps(0)} />
          <Tab label="Expired" {...a11yProps(1)} />
          <Tab label="Revoked" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        {isLoading && renderLoading()}
        {!isLoading && activeConsents.length > 0 && (
          <Card>
            <ConsentList
              consents={activeConsents}
              url={urlPrefix}
              onPagination={handlePaginationChange}
              pagination={pagination}
            />
          </Card>
        )}
        {!isLoading && activeConsents.length === 0 && noConsentItems(Status.Active)}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {isLoading && renderLoading()}
        {!isLoading && expiredConsents.length > 0 && (
          <Card>
            <ConsentList
              consents={expiredConsents}
              url={urlPrefix}
              onPagination={handlePaginationChange}
              pagination={pagination}
            />
          </Card>
        )}
        {!isLoading && expiredConsents.length === 0 && noConsentItems(Status.Expired)}
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        {isLoading && renderLoading()}
        {!isLoading && revokedConsents.length > 0 && (
          <Card>
            <ConsentList
              consents={revokedConsents}
              url={urlPrefix}
              onPagination={handlePaginationChange}
              pagination={pagination}
            />
          </Card>
        )}
        {!isLoading && revokedConsents.length === 0 && noConsentItems(Status.Revoked)}
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
      {value === index && <Box sx={{ px: { xs: 0, sm: 1, md: 3 }, py: { xs: 1, sm: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `Consent-tab-${index}`,
    'aria-controls': `Consent-tabpanel-${index}`,
  };
};

const renderLoading = () => {
  return (
    <>
      <Skeleton height="80px" /> <Skeleton height="80px" />
    </>
  );
};
