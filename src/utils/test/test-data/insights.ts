import { Insight, InsightResponse } from '../../../types/insight-response.type';

const accountInformation = (): Insight => {
  return {
    name: 'BSB number, account number, balance',
    example: 'We will recive your BSB number, account number and account balance.',
    dataScopes: [{ name: 'Account balance and details' }],
  };
};

const identity = (): Insight => {
  return {
    name: 'Verify your identity',
    example: 'We will recive your name, address and occupation.',
    dataScopes: [{ name: 'Contact details' }, { name: 'Name and occupation' }],
  };
};

const accountBalance = (): Insight => {
  return {
    name: 'Verify your account balance',
    example: 'Yes, account balance is more than the required [amount].',
    dataScopes: [{ name: 'Account name, type and balance' }],
  };
};

const income = (): Insight => {
  return {
    name: 'Verify your income',
    example: 'Based on the last 6 months, average monthly income is [amount].',
    dataScopes: [{ name: 'Transaction details' }],
    extraInfo: 'We have used deposits to your account to calculate your average monthly income for the last 6 months.',
  };
};

const all = (): InsightResponse => {
  return {
    nonAccreditedDataRecipient: 'Non Accredited Data Recipient',
    purpose: 'to verify your account details and income',
    dataHandlingUrl: 'https://example.com/our-data-policy',
    insights: [accountInformation(), identity(), accountBalance(), income()],
  };
};

const single = (): InsightResponse => {
  return {
    nonAccreditedDataRecipient: 'Non Accredited Data Recipient',
    purpose: 'to verify your account details',
    dataHandlingUrl: 'https://example.com/our-data-policy',
    insights: [accountInformation()],
  };
};

export const insights = {
  all,
  single,
};
