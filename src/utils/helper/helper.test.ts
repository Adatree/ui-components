import { Helper } from './helper';
import { TestUtil } from '../test/test.util';
import { AccessFrequency, SharingDuration, Status } from '../../generated/consent';
import { DateDurationList } from '../../consts/duration.const';

describe('Helper Utils', () => {
  TestUtil.suspendLogger();

  describe('sortListbyDate', () => {
    it('should sort a list of Consents by date', () => {
      const list = TestUtil.testData.consent.all();

      const sortedList = Helper.sortListbyDate(list);

      expect(sortedList[0].consentId).toEqual('b89ce648-1589-470c-8829-9955379fc5fc');
      expect(sortedList[1].consentId).toEqual('550b2d5a-2c52-4213-a9eb-3abe467d99a9');
      expect(sortedList[2].consentId).toEqual('6e485649-3113-468d-8067-5f18580476f6');
      expect(sortedList[3].consentId).toEqual('f328b2fb-441e-951d-2f9e-2296af82cae1');
      expect(sortedList[4].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');
      expect(sortedList[5].consentId).toEqual('3ad2f7ce-18f4-451f-afb6-0077b339ddb4');
    });
  });

  it('should format date string into a human readable format', () => {
    const list = TestUtil.testData.consent.all();

    const activeList = Helper.filterListbyStatus(list, Status.ACTIVE);
    const expiredList = Helper.filterListbyStatus(list, Status.EXPIRED);
    const requestedList = Helper.filterListbyStatus(list, Status.REQUESTED);
    const revokedList = Helper.filterListbyStatus(list, Status.REVOKED);

    expect(activeList.length).toEqual(2);
    expect(activeList[0].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');
    expect(activeList[1].consentId).toEqual('3ad2f7ce-18f4-451f-afb6-0077b339ddb4');

    expect(expiredList.length).toEqual(1);
    expect(expiredList[0].consentId).toEqual('6e485649-3113-468d-8067-5f18580476f6');

    expect(requestedList.length).toEqual(1);
    expect(requestedList[0].consentId).toEqual('b89ce648-1589-470c-8829-9955379fc5fc');

    expect(revokedList.length).toEqual(2);
    expect(revokedList[0].consentId).toEqual('f328b2fb-441e-951d-2f9e-2296af82cae1');
    expect(revokedList[1].consentId).toEqual('550b2d5a-2c52-4213-a9eb-3abe467d99a9');
  });

  describe('filterDataHoldersByConsentsAndUseCase', () => {
    it('should return DataHolder if a consent exist with that dataholder and use case', () => {
      const dataHolders = TestUtil.testData.dataHolder.all();
      const consents = TestUtil.testData.consent.all();
      const homeUseCase = TestUtil.testData.useCase.homeLoan();
      const onceOffToolUseCase = TestUtil.testData.useCase.onceOffConsentMinScopes();

      const filteredByHomeUseCase = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, homeUseCase);

      expect(filteredByHomeUseCase.length).toEqual(1);
      expect(filteredByHomeUseCase[0].brandName).toEqual('Yellow Bank of Australia');

      const filteredByonceOffUseCase = Helper.filterDataHoldersByConsentsAndUseCase(
        dataHolders,
        consents,
        onceOffToolUseCase,
      );

      expect(filteredByonceOffUseCase.length).toEqual(1);
      expect(filteredByonceOffUseCase[0].brandName).toEqual('Red Australia Bank');

      const emptyfilteredDataholders = Helper.filterDataHoldersByConsentsAndUseCase(
        [TestUtil.testData.dataHolder.redBank()],
        [TestUtil.testData.consent.active()],
        homeUseCase,
      );
      expect(emptyfilteredDataholders.length).toEqual(0);
    });

    it('should not return DataHolders if use case is invalid', () => {
      const dataHolders = TestUtil.testData.dataHolder.all();
      const consents = TestUtil.testData.consent.all();
      const useCase = TestUtil.testData.useCase.homeLoan();
      useCase.id = undefined;

      const filteredDataHolders01 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, useCase);
      expect(filteredDataHolders01.length).toEqual(0);

      const filteredDataHolders02 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, {});
      expect(filteredDataHolders02.length).toEqual(0);
    });

    it('should not return DataHolders if consents are invalid', () => {
      const dataHolders = TestUtil.testData.dataHolder.all();
      const useCase = TestUtil.testData.useCase.homeLoan();

      let consent = TestUtil.testData.consent.active();
      consent.status = undefined;
      const filteredDataHolders01 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders01.length).toEqual(0);

      consent = TestUtil.testData.consent.active();
      consent.dataHolderBrandId = undefined;
      const filteredDataHolders02 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders02.length).toEqual(0);

      consent = TestUtil.testData.consent.active();
      consent.useCase = undefined;
      const filteredDataHolders03 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders03.length).toEqual(0);

      consent = TestUtil.testData.consent.active();
      consent.useCase = { ...consent.useCase, id: undefined };
      const filteredDataHolders04 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders04.length).toEqual(0);

      const filteredDataHolders05 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [], useCase);
      expect(filteredDataHolders05.length).toEqual(0);
    });
  });

  describe('accessFrequencyToString', () => {
    it('should return the correct access frequency string', () => {
      expect(Helper.accessFrequencyToString(AccessFrequency.ONGOING)).toEqual('Ongoing');
      expect(Helper.accessFrequencyToString(AccessFrequency.ONCEOFF)).toEqual('Once-off');
    });
  });

  describe('parseSharingDuration', () => {
    it('should parse the SharingDuration array amd return the correct DateDuration array', () => {
      expect(Helper.parseSharingDuration(SharingDuration.ONEDAY)).toEqual(DateDurationList[0]);
      expect(Helper.parseSharingDuration(SharingDuration.ONCEOFF)).toEqual(DateDurationList[8]);
      expect(Helper.parseSharingDuration(SharingDuration.CUSTOM)).toEqual(DateDurationList[9]);
    });
  });

  describe('getScopeDifference', () => {
    it('should get scope difference between scope array A and B', () => {
      // Same
      expect(Helper.getScopeDifference([{ id: 'A', name: 'Name A' }], [{ id: 'A', name: 'Name A' }])).toEqual([]);
      expect(Helper.getScopeDifference([{ id: 'A', name: 'Name A' }], [{ id: 'A', name: 'Name A new' }])).toEqual([]);

      // Scope(s) are present in the compareWithBaseScopes array
      expect(Helper.getScopeDifference([{ id: 'A', name: 'Name A' }], [{ id: 'B', name: 'Name B' }])).toEqual([
        { id: 'B', name: 'Name B' },
      ]);
      expect(
        Helper.getScopeDifference(
          [
            { id: 'A', name: 'Name A' },
            { id: 'AA', name: 'Name AA' },
            { id: 'AAA', name: 'Name AAA' },
          ],
          [
            { id: 'B', name: 'Name B' },
            { id: 'BB', name: 'Name BB' },
            { id: 'BBB', name: 'Name BBB' },
          ],
        ),
      ).toEqual([
        { id: 'B', name: 'Name B' },
        { id: 'BB', name: 'Name BB' },
        { id: 'BBB', name: 'Name BBB' },
      ]);
      expect(
        Helper.getScopeDifference(
          [
            { id: 'A', name: 'Name A' },
            { id: 'AA', name: 'Name AA' },
            { id: 'AAA', name: 'Name AAA' },
          ],
          [
            { id: 'B', name: 'Name B' },
            { id: 'AA', name: 'Name AA' },
            { id: 'BBB', name: 'Name BBB' },
          ],
        ),
      ).toEqual([
        { id: 'B', name: 'Name B' },
        { id: 'BBB', name: 'Name BBB' },
      ]);

      // compareWithBaseScopes scope are all in baseScopes
      expect(
        Helper.getScopeDifference(
          [
            { id: 'A', name: 'Name A' },
            { id: 'AA', name: 'Name AA' },
            { id: 'AAA', name: 'Name AAA' },
          ],
          [
            { id: 'AA', name: 'Name AA' },
            { id: 'AAA', name: 'Name AAA' },
          ],
        ),
      ).toEqual([]);
    });
  });
});
