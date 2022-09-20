import { DataHolder } from '../../../generated/consent/api';

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

const ecoPowerEnergy = (): DataHolder => {
  return {
    dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
    brandName: 'Eco Power',
    logoUri: 'https://design.adatree.com.au/assets/images/eco-logo.png',
  };
};

const originalEnergy = (): DataHolder => {
  return {
    dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Yellow Bank of Australia',
    logoUri: 'https://design.adatree.com.au/assets/images/org-logo.png',
  };
};

const ozGasEnergy = (): DataHolder => {
  return {
    dataHolderBrandId: '8a8cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Royal Blue Bank of Australia',
    logoUri: 'https://design.adatree.com.au/assets/images/ozg-logo.png',
  };
};

const yourPowerEnergy = (): DataHolder => {
  return {
    dataHolderBrandId: '7a7cea5d-19c4-458b-ab79-c926455475d3',
    brandName: 'Green Bank',
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
  ecoPowerEnergy,
  originalEnergy,
  ozGasEnergy,
  yourPowerEnergy,
};
