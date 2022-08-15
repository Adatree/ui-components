import { DataHolder } from '../../../generated/consent/api';

const redBank = (): DataHolder => {
  return {
    dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
    brandName: 'Red Australia Bank',
    logoUri: 'https://placehold.co/100x100/FF3B3B/000?text=logo',
  };
};

const yellowBank = (): DataHolder => {
  return {
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Yellow Bank of Australia',
    logoUri: 'https://placehold.co/100x100/FFFC3B/000?text=logo',
  };
};

const all = (): DataHolder[] => {
  return [redBank(), yellowBank()];
};

export const dataHolder = {
  all,
  redBank,
  yellowBank,
};
