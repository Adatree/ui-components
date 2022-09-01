import {
  BankingTransactionAdatreePersoneticsCategoryNameEnum,
  BankingTransactionExtendedDataExtensionUTypeEnum,
  BankingTransactionExtendedDataServiceEnum,
  BankingTransactionList,
  BankingTransactionStatusEnum,
  BankingTransactionTypeEnum,
  BankingTransactionAdatreePersoneticsSubCategoryNameEnum,
  BankingTransaction,
} from '../../../generated/data/api';
import { v4 as uuidv4 } from 'uuid';

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const getTransactions = (numOfTransactions: number): BankingTransaction[] => {
  const transactions: BankingTransaction[] = [];

  for (let index = 0; index < numOfTransactions; index++) {
    transactions.push(generateTransaction());
  }
  return transactions;
};

const generateTransaction = (): BankingTransaction => {
  return {
    accountId: uuidv4(),
    transactionId: uuidv4(),
    isDetailAvailable: false,
    type: randomEnum(BankingTransactionTypeEnum),
    status: randomEnum(BankingTransactionStatusEnum),
    description: 'OVERDRAWN FEE 01-JUNE-2022',
    postingDateTime: '2022-06-02T00:00:00+10:00',
    valueDateTime: undefined,
    executionDateTime: '2022-06-02T00:00:00+10:00',
    amount: (Math.floor(Math.random() * 199) - 99).toString(),
    currency: 'AUD',
    reference: '0014013',
    merchantName: undefined,
    merchantCategoryCode: undefined,
    billerCode: undefined,
    billerName: undefined,
    crn: undefined,
    apcaNumber: undefined,
    extendedData: {
      payer: 'Mr Adatree',
      payee: 'Red Bank Australia',
      extensionUType: randomEnum(BankingTransactionExtendedDataExtensionUTypeEnum),
      x2p101Payload: {
        extendedDescription: 'Adatree testing',
        endToEndId: 'Adatree testing',
        purposeCode: undefined,
      },
      service: randomEnum(BankingTransactionExtendedDataServiceEnum),
    },
    adatree: {
      consentId: 'abc8d9c3-6527-4349-a8fb-d1f7f90f225d',
      consumerId: 'idp|1234567890ABCDEF',
      cdrArrangementId: '8e228588-5821-4a6f-8b39-fb9c346e2158',
      dataHolderBrandId: '1234',
      useCaseId: 'HOME_LOAN',
      resourceId: uuidv4(),
      categorisation: {
        personetics: {
          categoryName: randomEnum(BankingTransactionAdatreePersoneticsCategoryNameEnum),
          subCategoryName: randomEnum(BankingTransactionAdatreePersoneticsSubCategoryNameEnum),
        },
      },
    },
  };
};

const bankTransactionsList = (numOfTransactions: number): BankingTransactionList => {
  return {
    data: {
      transactions: getTransactions(numOfTransactions),
    },
    links: { self: '' },
    meta: { totalRecords: numOfTransactions, totalPages: 1 },
  };
};

export const bankData = {
  bankTransactionsList,
};
