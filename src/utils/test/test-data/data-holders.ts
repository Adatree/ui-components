import { DataHolder } from '@adatree/react-api-sdk-dashboard';

const redBank = (): DataHolder => {
  return {
    dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
    brandName: 'Red Australia Bank',
    logoUri: 'https://design.adatree.com.au/assets/images/rab_logo.png',
  };
};

const yellowBank = (): DataHolder => {
  return {
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Yellow Bank of Australia',
    logoUri: 'https://design.adatree.com.au/assets/images/yba_logo.png',
  };
};

const blueBank = (): DataHolder => {
  return {
    dataHolderBrandId: '8a8cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Royal Blue Bank of Australia',
    logoUri: 'https://design.adatree.com.au/assets/images/rbba-logo.png',
  };
};

const greenBank = (): DataHolder => {
  return {
    dataHolderBrandId: '7a7cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Green Bank',
    logoUri: 'https://design.adatree.com.au/assets/images/gb-logo.png',
  };
};

const longBank = (): DataHolder => {
  return {
    dataHolderBrandId: '11111-11111',
    brandName: 'Long Bank of Australia',
    logoUri: 'https://placehold.co/800x200/000000/FFF?text=Long+Bank',
  };
};

const tallBank = (): DataHolder => {
  return {
    dataHolderBrandId: '22222-22222',
    brandName: 'Tall Bank of Australia',
    logoUri: 'https://placehold.co/200x800/000000/FFF?text=Tall+Bank',
  };
};

const ecoPowerEnergy = (): DataHolder => {
  return {
    dataHolderBrandId: 'e3e0c26a-db81-491f-bfb2-90ea2da621c8',
    brandName: 'Eco Power',
    logoUri: 'https://design.adatree.com.au/assets/images/eco-logo.png',
  };
};

const originalEnergy = (): DataHolder => {
  return {
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Original Energy',
    logoUri: 'https://design.adatree.com.au/assets/images/org-logo.png',
  };
};

const ozGasEnergy = (): DataHolder => {
  return {
    dataHolderBrandId: '8a8cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Oz Gas',
    logoUri: 'https://design.adatree.com.au/assets/images/ozg-logo.png',
  };
};

const yourPowerEnergy = (): DataHolder => {
  return {
    dataHolderBrandId: '7a7cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Your Power',
    logoUri: 'https://design.adatree.com.au/assets/images/yp-logo.png',
  };
};

const allBanking = (): DataHolder[] => {
  return [redBank(), yellowBank(), blueBank(), greenBank()];
};

const allEngery = (): DataHolder[] => {
  return [ecoPowerEnergy(), originalEnergy(), ozGasEnergy(), yourPowerEnergy()];
};

export const dataHolder = {
  allBanking,
  allEngery,
  redBank,
  yellowBank,
  longBank,
  tallBank,
  ecoPowerEnergy,
  originalEnergy,
  ozGasEnergy,
  yourPowerEnergy,
};
