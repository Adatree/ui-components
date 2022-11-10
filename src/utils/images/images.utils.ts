import { DataHolder } from '../../generated/consent/api';

const HighResDataHoldersLogos = [
  {
    brandName: 'ANZ',
    dataHolderBrandId: 'f4562bb8-e394-ea11-a831-000d3a8842e1',
    logoUri: 'https://design.adatree.com.au/assets/images/data-holders/banks/anz-logo.svg',
  },
  {
    brandName: 'CommBank',
    dataHolderBrandId: '25233bad-e494-ea11-a831-000d3a8842e1',
    logoUri: 'https://design.adatree.com.au/assets/images/data-holders/banks/commbank-logo.svg',
  },
  {
    brandName: 'NAB',
    dataHolderBrandId: '25797662-e294-ea11-a831-000d3a8842e1',
    logoUri: 'https://design.adatree.com.au/assets/images/data-holders/banks/nab-logo.svg',
  },
  {
    brandName: 'Westpac',
    dataHolderBrandId: 'ffe2945b-e094-ea11-a831-000d3a8842e1',
    logoUri: 'https://design.adatree.com.au/assets/images/data-holders/banks/westpac-logo.svg',
  },
];

export const getHighResLogoUri = (dataholder: DataHolder): string => {
  let logoUri = dataholder.logoUri;

  for (let i = 0; i < HighResDataHoldersLogos.length; i++) {
    if (HighResDataHoldersLogos[i].dataHolderBrandId === dataholder.dataHolderBrandId) {
      logoUri = HighResDataHoldersLogos[i].logoUri;
      break;
    }
  }

  return logoUri;
};
