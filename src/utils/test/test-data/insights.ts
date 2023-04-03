import { Insight, InsightResponse } from '../../../types/insight-response.type';

const accountInformation = (): Insight => {
  return {
    name: 'Account information',
    example: 'BSB number, Account number,  Account balamce and Account addresses',
    dataScopes: [{ name: 'Account balance and details' }, { name: 'Name and occupation' }],
  };
};

const identity = (): Insight => {
  return {
    name: 'Verify your identity',
    example: 'Yes, identity details match.',
    dataScopes: [{ name: 'Contact details' }, { name: 'Name and occupation' }],
  };
};

const accountBalance = (): Insight => {
  return {
    name: 'Verify your account balance',
    example: 'Yes, account balance is more than $100.',
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
    insights: [(accountInformation(), identity(), accountBalance(), income())],
  };
};

const single = (): InsightResponse => {
  return {
    nonAccreditedDataRecipient: 'Non Accredited Data Recipient',
    insights: [accountInformation()],
  };
};

export const insights = {
  all,
  single,
};
