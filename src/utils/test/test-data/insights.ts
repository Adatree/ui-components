import { InsightResponse } from '../../../types/insight-response.type';

const identity = (): InsightResponse => {
  return {
    name: 'Verify your identity',
    example: 'Yes, identity details match.',
    dataScopes: [{ name: 'Contact details' }, { name: 'Name and occupation' }],
    dataHolderName: 'Red Australian Bank',
  };
};

const accountBalance = (): InsightResponse => {
  return {
    name: 'Verify your account balance',
    example: 'Yes, account balance is more than $100.',
    dataScopes: [{ name: 'Account name, type and balance' }],
    dataHolderName: 'Red Australian Bank',
  };
};

const income = (): InsightResponse => {
  return {
    name: 'Verify your income',
    example: 'Based on the last 6 months, average monthly income is [amount].',
    dataScopes: [{ name: 'Transaction details' }],
    dataHolderName: 'Red Australian Bank',
    extraInfo: 'We have used deposits to your account to calculate your average monthly income for the last 6 months.',
  };
};

const all = (): InsightResponse[] => [identity(), accountBalance(), income()];

export const insights = {
  all,
  identity,
};
