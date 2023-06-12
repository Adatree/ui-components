import { Formatter } from './formatter';
import { TestUtil } from '../test/test.util';

/*
 * We use date-fns format that returns the
 * formatted date string in the given format.
 * Its important to note the result may vary by locale.
 * https://date-fns.org/docs/format
 */
describe('Formatter Utils', () => {
  TestUtil.suspendLogger();

  describe('Formatter.formatDate', () => {
    it('should format date object into a human readable format', () => {
      const date = new Date(1607105280278);
      const expectedInvalidFormat = '';
      const expectedValidFormat = '04/12/2020';

      expect(Formatter.formatDate(undefined)).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDate(date)).toEqual(expectedValidFormat);
    });

    it('should format date string into a human readable format', () => {
      const date1 = '2021-01-05T12:52:09.804Z';
      const date2 = '2022-06-15T03:01:15.446231Z';
      const date3 = '2020-12-23T00:00:00.000Z';
      const date4 = '2021-01-30T04:19:00Z';

      const expectedInvalidFormat = '';
      const expectedValidFormat1 = '05/01/2021';
      const expectedValidFormat2 = '15/06/2022';
      const expectedValidFormat3 = '23/12/2020';
      const expectedValidFormat4 = '30/01/2021';

      expect(Formatter.formatDate('')).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDate('invalid')).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDate(undefined)).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDate(date1)).toEqual(expectedValidFormat1);
      expect(Formatter.formatDate(date2)).toEqual(expectedValidFormat2);
      expect(Formatter.formatDate(date3)).toEqual(expectedValidFormat3);
      expect(Formatter.formatDate(date4)).toEqual(expectedValidFormat4);
    });
  });

  describe('Formatter.formatDateTime', () => {
    it('should format date object into a human readable format', () => {
      const date = new Date(1607105280278);
      const expectedInvalidFormat = '';
      const expectedValidFormat = '04/12/2020 06:08 pm';

      expect(Formatter.formatDateTime(undefined)).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDateTime(date)).toEqual(expectedValidFormat);
    });

    it('should format date string into a human readable format', () => {
      const date1 = '2021-01-05T12:52:09.804Z';
      const date2 = '2022-06-15T03:01:15.446231Z';
      const date3 = '2020-12-23T00:00:00.000Z';
      const date4 = '2021-01-30T04:19:00Z';

      const expectedInvalidFormat = '';
      const expectedValidFormat1 = '05/01/2021 12:52 pm';
      const expectedValidFormat2 = '15/06/2022 04:01 am';
      const expectedValidFormat3 = '23/12/2020 12:00 am';
      const expectedValidFormat4 = '30/01/2021 04:19 am';

      expect(Formatter.formatDateTime('')).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDateTime('invalid')).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDateTime(undefined)).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDateTime(date1)).toEqual(expectedValidFormat1);
      expect(Formatter.formatDateTime(date2)).toEqual(expectedValidFormat2);
      expect(Formatter.formatDateTime(date3)).toEqual(expectedValidFormat3);
      expect(Formatter.formatDateTime(date4)).toEqual(expectedValidFormat4);
    });
  });

  describe('Formatter.formatDateTimeTz', () => {
    it('should format date object into a human readable format', () => {
      const date = new Date(1607105280278);
      const expectedInvalidFormat = '';
      const expectedValidFormat = '04/12/2020 18:08:00 +0000';

      expect(Formatter.formatDateTimeTz(undefined)).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDateTimeTz(date)).toEqual(expectedValidFormat);
    });

    it('should format date string into a human readable format', () => {
      const date1 = '2021-01-05T12:52:09.804Z';
      const date2 = '2022-06-15T03:01:15.446231Z';
      const date3 = '2020-12-23T00:00:00.000Z';
      const date4 = '2021-01-30T04:19:00Z';

      const expectedInvalidFormat = '';
      const expectedValidFormat1 = '05/01/2021 12:52:09 +0000';
      const expectedValidFormat2 = '15/06/2022 04:01:15 +0100';
      const expectedValidFormat3 = '23/12/2020 00:00:00 +0000';
      const expectedValidFormat4 = '30/01/2021 04:19:00 +0000';

      expect(Formatter.formatDateTimeTz('')).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDateTimeTz('invalid')).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDateTimeTz(undefined)).toEqual(expectedInvalidFormat);
      expect(Formatter.formatDateTimeTz(date1)).toEqual(expectedValidFormat1);
      expect(Formatter.formatDateTimeTz(date2)).toEqual(expectedValidFormat2);
      expect(Formatter.formatDateTimeTz(date3)).toEqual(expectedValidFormat3);
      expect(Formatter.formatDateTimeTz(date4)).toEqual(expectedValidFormat4);
    });
  });
});
