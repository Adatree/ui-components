import { Images } from './images.utils';

describe('Image Utils', () => {
  describe('Images.getHighResLogoUri', () => {
    it('should get the correct HD logo URI for ANZ', () => {
      const AnzDataHolder = {
        brandName: 'ANZ',
        dataHolderBrandId: 'f4562bb8-e394-ea11-a831-000d3a8842e1',
        logoUri: '/some-url/logo.png',
      };

      const logoUri = Images.getHighResLogoUri(AnzDataHolder);

      expect(logoUri).toEqual('https://design.adatree.com.au/assets/images/data-holders/banks/anz-logo.svg');
    });

    it('should get the correct HD logo URI for Commbank', () => {
      const AnzDataHolder = {
        brandName: 'CommBank',
        dataHolderBrandId: '25233bad-e494-ea11-a831-000d3a8842e1',
        logoUri: '/some-url/logo.png',
      };

      const logoUri = Images.getHighResLogoUri(AnzDataHolder);

      expect(logoUri).toEqual('https://design.adatree.com.au/assets/images/data-holders/banks/commbank-logo.svg');
    });

    it('should get the correct HD logo URI for NAB', () => {
      const AnzDataHolder = {
        brandName: 'NAB',
        dataHolderBrandId: '25797662-e294-ea11-a831-000d3a8842e1',
        logoUri: '/some-url/logo.png',
      };

      const logoUri = Images.getHighResLogoUri(AnzDataHolder);

      expect(logoUri).toEqual('https://design.adatree.com.au/assets/images/data-holders/banks/nab-logo.svg');
    });

    it('should get the correct HD logo URI for Westpac', () => {
      const AnzDataHolder = {
        brandName: 'Westpac',
        dataHolderBrandId: 'ffe2945b-e094-ea11-a831-000d3a8842e1',
        logoUri: '/some-url/logo.png',
      };

      const logoUri = Images.getHighResLogoUri(AnzDataHolder);

      expect(logoUri).toEqual('https://design.adatree.com.au/assets/images/data-holders/banks/westpac-logo.svg');
    });

    it('should return the existing logo for non HD data holders', () => {
      const nonHdDataHolder = {
        brandName: 'non HD',
        dataHolderBrandId: '111111111-2222-3333-4444-55555555555',
        logoUri: '/some-url/logo.png',
      };

      const logoUri = Images.getHighResLogoUri(nonHdDataHolder);

      expect(logoUri).toEqual('/some-url/logo.png');
    });
  });
});
