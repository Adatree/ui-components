import { DataHolder } from '../../../generated/consent/api';

const redBank = (): DataHolder => {
  return {
    dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
    brandName: 'Red Australia Bank',
    logoUri: 'https://placehold.co/100x100/EE2115/000?text=Red%20Bank',
  };
};

const yellowBank = (): DataHolder => {
  return {
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Yellow Bank of Australia',
    logoUri: 'https://placehold.co/100x100/F7C63A/000?text=Yellow%20Bank',
  };
};

const blueBank = (): DataHolder => {
  return {
    dataHolderBrandId: '8a8cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Royal Blue Bank of Australia',
    logoUri: 'https://placehold.co/200x100/4169e1/000?text=Blue%20Bank',
  };
};

const greenBank = (): DataHolder => {
  return {
    dataHolderBrandId: '7a7cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Green Bank',
    logoUri: 'https://placehold.co/100x200/7BB123/000?text=Green%20Bank',
  };
};

const all = (): DataHolder[] => {
  return [redBank(), yellowBank(), blueBank(), greenBank()];
};

export const dataHolder = {
  all,
  redBank,
  yellowBank,
};
