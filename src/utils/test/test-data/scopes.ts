import { ScopeResponse } from '@adatree/react-api-sdk-dashboard';

const bankAccountsBasicRead = (): ScopeResponse => {
  return {
    name: 'Account name, type and balance',
    id: 'bank:accounts.basic:read',
    purpose: 'We need your account name, type and balance for X reason.',
    claims: ['Name of account', 'Type of account', 'Account balance'],
    priority: 2,
  };
};

const bankAccountsDetailRead = (): ScopeResponse => {
  return {
    name: 'Account numbers and features',
    id: 'bank:accounts.detail:read',
    purpose: 'We need your account numbers and features for X reason.',
    claims: ['Account number', 'Interest rates', 'Fees', 'Discounts', 'Account terms', 'Account mail address'],
    priority: 3,
  };
};

const bankTransactionsRead = (): ScopeResponse => {
  return {
    name: 'Transaction details',
    id: 'bank:transactions:read',
    purpose: 'We need your transaction details for X reason.',
    claims: [
      'Incoming and outgoing transactions',
      'Amounts',
      'Dates',
      'Descriptions of transactions',
      'Who you have sent money to and received money from (e.g. their name)',
    ],
    priority: 4,
  };
};

const commonCustomerBasicRead = (): ScopeResponse => {
  return {
    name: 'Name and occupation',
    id: 'common:customer.basic:read',
    purpose: 'We need your name and occupation for X reason.',
    claims: ['Name', 'Occupation'],
    priority: 0,
  };
};

const commonCustomerDetailRead = (): ScopeResponse => {
  return {
    name: 'Contact details',
    id: 'common:customer.detail:read',
    purpose: 'We need your personal details to X reason.',
    claims: ['Phone', 'Email address', 'Mail address', 'Residential address'],
    priority: 1,
  };
};

const energyAccountsBasicRead = (): ScopeResponse => {
  return {
    name: 'Accounts and plans',
    id: 'energy:accounts.basic:read',
    purpose: 'We need your basic account information to X reason.',
    claims: ['Account and plan information', 'National Meter Identifier (NMI)'],
    priority: 7,
  };
};

const energyBillingRead = (): ScopeResponse => {
  return {
    name: 'Billing payments and history',
    id: 'energy:billing:read',
    purpose: 'We need your billing information to X reason.',
    claims: [
      'Account balance',
      'National Meter Identifier (NMI)',
      'Payment method',
      'Payment status',
      'Charges, discounts, credits',
      'Billing date',
      'Usage for billing period',
      'Payment date',
      'Invoice number',
    ],
    priority: 11,
  };
};

const energyElectricityUsageRead = (): ScopeResponse => {
  return {
    name: 'Electricity usage',
    id: 'energy:electricity.usage:read',
    purpose: 'We need your usage information to X reason.',
    claims: ['Usage', 'Meter details'],
    priority: 15,
  };
};

const energyAccountsDetailRead = (): ScopeResponse => {
  return {
    name: 'Account and plan details',
    id: 'energy:accounts.detail:read',
    purpose: 'We need your detailed account information to X reason.',
    claims: [
      'Account and plan information',
      'National Meter Identifier (NMI)',
      'Account type',
      'Fees, features, rates, and discounts',
      'Additional account users',
    ],
    priority: 8,
  };
};

const energyAccountsConcessionsRead = (): ScopeResponse => {
  return {
    name: 'Concessions and assistance',
    id: 'energy:accounts.concessions:read',
    purpose: 'We need your concession information to X reason.',
    claims: ['Concession type', 'Concession information'],
    priority: 9,
  };
};

const energyAccountsPaymentscheduleRead = (): ScopeResponse => {
  return {
    name: 'Stored payment information',
    id: 'energy:accounts.paymentschedule:read',
    purpose: 'We need your payments information to X reason.',
    claims: ['Payment details', 'Scheduled payment amount'],
    priority: 10,
  };
};

const energyElectricityServicepointsBasicRead = (): ScopeResponse => {
  return {
    name: 'Electricity connection',
    id: 'energy:electricity.servicepoints.basic:read',
    purpose: 'We need your basic service point information to X reason.',
    claims: ['National Meter Identifier (NMI)', 'Customer type', 'Connection point details'],
    priority: 12,
  };
};

const energyElectricityServicepointsDetailRead = (): ScopeResponse => {
  return {
    name: 'Electricity connection and meter',
    id: 'energy:electricity.servicepoints.detail:read',
    purpose: 'We need your detailed service point information to X reason.',
    claims: [
      'National Meter Identifier (NMI)',
      'Supply address',
      'Customer type',
      'Connection point details',
      'Meter details',
      'Associated service providers',
    ],
    priority: 13,
  };
};

const cdrInsightsOne = (): ScopeResponse => {
  return {
    name: 'Verify my Identity',
    id: 'cdr:insights:verify.identity',
    purpose: 'This is the CDR Insight purpose for Verify my Identity.',
    claims: ['Name', 'Residential address', 'Date of birth'],
    priority: 1,
  };
};

const cdrInsightsTwo = (): ScopeResponse => {
  return {
    name: 'CDR Insight 2',
    id: 'cdr:insights:example.two.basic:read',
    purpose: 'This is the CDR Insight purpose for CDR Insight 2.',
    claims: ['CDR claim 4', 'CDR claim 5', 'CDR claim 6'],
    priority: 2,
  };
};

const energyElectricityDerRead = (): ScopeResponse => {
  return {
    name: 'Energy generation and storage',
    id: 'energy:electricity.der:read',
    purpose: 'We need your energy generation information to X reason.',
    claims: [
      'Generation information',
      'Generation or storage device type',
      'Device characteristics',
      'Devices that can operate without the grid',
      'Energy conversion information',
    ],
    priority: 14,
  };
};

const all = (): ScopeResponse[] => [
  bankAccountsBasicRead(),
  bankAccountsDetailRead(),
  bankTransactionsRead(),
  commonCustomerBasicRead(),
  commonCustomerDetailRead(),
  energyAccountsBasicRead(),
  energyBillingRead(),
  energyElectricityUsageRead(),
  energyAccountsDetailRead(),
  energyAccountsConcessionsRead(),
  energyAccountsPaymentscheduleRead(),
  energyElectricityServicepointsBasicRead(),
  energyElectricityServicepointsDetailRead(),
  energyElectricityDerRead(),
];

export const scope = {
  all,
  bankAccountsBasicRead,
  bankAccountsDetailRead,
  bankTransactionsRead,
  cdrInsightsOne,
  cdrInsightsTwo,
  commonCustomerBasicRead,
  commonCustomerDetailRead,
  energyAccountsBasicRead,
  energyBillingRead,
  energyElectricityUsageRead,
  energyAccountsDetailRead,
  energyAccountsConcessionsRead,
  energyAccountsPaymentscheduleRead,
  energyElectricityServicepointsBasicRead,
  energyElectricityServicepointsDetailRead,
  energyElectricityDerRead,
};
