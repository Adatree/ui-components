import { Helper } from './helper';
import { TestUtil } from '../test/test.util';
import {
  AccessFrequency,
  ConsentResponse,
  SharingDuration,
  Status,
  UseCaseResponse,
} from '@adatree/react-api-sdk-dashboard';
import { DateDurationList } from '../../consts/duration.const';
import { DataRecipientType } from '../../types/data-recipient.type';
import { addDays, addHours, isWithinInterval } from 'date-fns';

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
      expect(sortedList[5].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');
      expect(sortedList[6].consentId).toEqual('fed8d9c3-6527-4349-a8fb-d1f7f90f225d');
      expect(sortedList[7].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');
    });

    it('should handle Consents with undefined dates', () => {
      let consentA = TestUtil.testData.consent.active();
      const consentB = TestUtil.testData.consent.expired();
      consentA.created = undefined;
      let sortedList = Helper.sortListbyDate([consentA, consentB]);

      expect(sortedList[0].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');

      consentA = TestUtil.testData.consent.active();
      consentA.sharingEndDate = undefined;
      sortedList = Helper.sortListbyDate([consentA, consentB]);

      expect(sortedList[0].consentId).toEqual('6e485649-3113-468d-8067-5f18580476f6');

      consentA = TestUtil.testData.consent.active();
      consentA.revoked = undefined;
      sortedList = Helper.sortListbyDate([consentA, consentB]);

      expect(sortedList[0].consentId).toEqual('6e485649-3113-468d-8067-5f18580476f6');
    });
  });

  it('should format date string into a human readable format', () => {
    const list = TestUtil.testData.consent.all();

    const activeList = Helper.filterListbyStatus(list, Status.Active);
    const expiredList = Helper.filterListbyStatus(list, Status.Expired);
    const requestedList = Helper.filterListbyStatus(list, Status.Requested);
    const revokedList = Helper.filterListbyStatus(list, Status.Revoked);

    expect(activeList.length).toEqual(5);
    expect(activeList[0].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');
    expect(activeList[1].consentId).toEqual('fed8d9c3-6527-4349-a8fb-d1f7f90f225d');
    expect(activeList[2].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');
    expect(activeList[3].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');

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
      const dataHolders = TestUtil.testData.dataHolder.allBanking();
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
      const dataHolders = TestUtil.testData.dataHolder.allBanking();
      const consents = TestUtil.testData.consent.all();
      const useCase = TestUtil.testData.useCase.homeLoan();
      // @ts-ignore for testing purposes
      useCase.id = undefined;

      const filteredDataHolders01 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, useCase);
      expect(filteredDataHolders01.length).toEqual(0);

      // @ts-ignore for testing purposes
      const filteredDataHolders02 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, {});
      expect(filteredDataHolders02.length).toEqual(0);
    });

    it('should not return DataHolders if consents are invalid', () => {
      const dataHolders = TestUtil.testData.dataHolder.allBanking();
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
      // @ts-ignore for testing purposes
      consent.useCase = { ...consent.useCase, id: undefined };
      const filteredDataHolders04 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders04.length).toEqual(0);

      const filteredDataHolders05 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [], useCase);
      expect(filteredDataHolders05.length).toEqual(0);
    });

    it('should not return DataHolders if no Data Holders are provided', () => {
      const dataHolders = undefined;
      const consents = TestUtil.testData.consent.all();
      const useCase = TestUtil.testData.useCase.homeLoan();

      const filteredDataHolders = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, useCase);
      expect(filteredDataHolders.length).toEqual(0);
    });
  });

  describe('accessFrequencyToString', () => {
    it('should return the correct access frequency string', () => {
      expect(Helper.accessFrequencyToString(AccessFrequency.Ongoing)).toEqual('Ongoing');
      expect(Helper.accessFrequencyToString(AccessFrequency.OnceOff)).toEqual('Once-off');
    });
  });

  describe('parseSharingDuration', () => {
    it('should parse the SharingDuration array amd return the correct DateDuration array', () => {
      expect(Helper.parseSharingDuration(SharingDuration.OneDay)).toEqual(DateDurationList[0]);
      expect(Helper.parseSharingDuration(SharingDuration.OnceOff)).toEqual(DateDurationList[8]);
      expect(Helper.parseSharingDuration(SharingDuration.Custom)).toEqual(DateDurationList[9]);
    });
  });

  describe('parseSharingDurations', () => {
    it('should parse the SharingDurations array amd return the correct DateDuration array', () => {
      expect(Helper.parseSharingDurations([SharingDuration.OneDay, SharingDuration.OneWeek])).toEqual([
        DateDurationList[0],
        DateDurationList[1],
      ]);
    });
  });

  describe('sharingDurationToString', () => {
    it('should return the correct string for the SharingDuration', () => {
      expect(Helper.sharingDurationToString(SharingDuration.OneDay)).toEqual('1 day');
      expect(Helper.sharingDurationToString(SharingDuration.TwoWeeks)).toEqual('2 weeks');
      expect(Helper.sharingDurationToString(SharingDuration.OnceOff)).toEqual('Once off');
      expect(Helper.sharingDurationToString(SharingDuration.Custom)).toEqual('Custom');
    });

    it('should return the undefined for invalid SharingDuration', () => {
      // @ts-expect-error INVALID is not a valid SharingDuration
      expect(Helper.sharingDurationToString('INVALID')).toEqual(undefined);
    });
  });

  describe('sharingDurationToDate', () => {
    it('should return the correct date for the SharingDuration', () => {
      const curDate = new Date();

      expect(
        isWithinInterval(Helper.sharingDurationToDate(SharingDuration.OneDay), {
          start: addHours(curDate, 23),
          end: addHours(curDate, 25),
        }),
      ).toBeTruthy();

      expect(
        isWithinInterval(Helper.sharingDurationToDate(SharingDuration.OneWeek), {
          start: addDays(curDate, 6),
          end: addDays(curDate, 8),
        }),
      ).toBeTruthy();

      expect(
        isWithinInterval(Helper.sharingDurationToDate(SharingDuration.OneMonth), {
          start: addDays(curDate, 27),
          end: addDays(curDate, 32),
        }),
      ).toBeTruthy();

      expect(
        isWithinInterval(Helper.sharingDurationToDate(SharingDuration.OneYear), {
          start: addDays(curDate, 364),
          end: addDays(curDate, 367),
        }),
      ).toBeTruthy();
    });
  });

  describe('dateDurationToDate', () => {
    it('should return the correct date for the SharingDuration', () => {
      const curDate = new Date();
      expect(
        isWithinInterval(Helper.dateDurationToDate(DateDurationList[0]), {
          start: addHours(curDate, 23),
          end: addHours(curDate, 25),
        }),
      ).toBeTruthy();

      expect(
        isWithinInterval(Helper.dateDurationToDate(DateDurationList[1]), {
          start: addDays(curDate, 6),
          end: addDays(curDate, 8),
        }),
      ).toBeTruthy();

      expect(
        isWithinInterval(Helper.dateDurationToDate(DateDurationList[3]), {
          start: addDays(curDate, 27),
          end: addDays(curDate, 31),
        }),
      ).toBeTruthy();

      expect(
        isWithinInterval(Helper.dateDurationToDate(DateDurationList[7]), {
          start: addDays(curDate, 364),
          end: addDays(curDate, 366),
        }),
      ).toBeTruthy();
    });
  });

  describe('getPrimaryDataRecipients', () => {
    it('should get the correct primary dataRecipient based the priority logic in the function', () => {
      const oneList = [TestUtil.testData.dataRecipient.accreditedDataRecipient()];
      const twoList = [
        TestUtil.testData.dataRecipient.accreditedDataRecipient(),
        TestUtil.testData.dataRecipient.accreditedDataRecipient(),
      ];
      const granteeList1 = [
        TestUtil.testData.dataRecipient.accreditedDataRecipient(),
        TestUtil.testData.dataRecipient.granteeRepresentative(),
        TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
      ];
      const bcdcList1 = [
        TestUtil.testData.dataRecipient.accreditedDataRecipient(),
        TestUtil.testData.dataRecipient.businessConsumerDisclosureConsent(),
      ];
      const cdrrList1 = [
        TestUtil.testData.dataRecipient.accreditedDataRecipient(),
        TestUtil.testData.dataRecipient.cdrRepresentative(),
      ];
      const taList1 = [
        TestUtil.testData.dataRecipient.accreditedDataRecipient(),
        TestUtil.testData.dataRecipient.trustedAdvisor(),
      ];
      const taList2 = [
        TestUtil.testData.dataRecipient.cdrRepresentative(),
        TestUtil.testData.dataRecipient.trustedAdvisor(),
      ];
      const taList3 = [
        TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
        TestUtil.testData.dataRecipient.trustedAdvisor(),
      ];
      const taspList = [
        TestUtil.testData.dataRecipient.accreditedDataRecipient(),
        TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
      ];
      const taspList2 = [
        TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
        TestUtil.testData.dataRecipient.cdrRepresentative(),
      ];
      const invalidList = [
        { ...TestUtil.testData.dataRecipient.accreditedDataRecipient(), type: 'INVALID_01' },
        { ...TestUtil.testData.dataRecipient.accreditedDataRecipient(), type: 'INVALID_02' },
      ];

      expect(Helper.getPrimaryDataRecipients(oneList).type).toEqual(DataRecipientType.ACCREDITED_DATA_RECIPIENT);
      expect(Helper.getPrimaryDataRecipients(twoList).type).toEqual(DataRecipientType.ACCREDITED_DATA_RECIPIENT);
      expect(Helper.getPrimaryDataRecipients(bcdcList1).type).toEqual(
        DataRecipientType.BUSINESS_CONSUMER_DISCLOSURE_CONSENT,
      );
      expect(Helper.getPrimaryDataRecipients(cdrrList1).type).toEqual(DataRecipientType.CDR_REPRESENTATIVE);
      expect(Helper.getPrimaryDataRecipients(granteeList1).type).toEqual(DataRecipientType.GRANTEE);
      expect(Helper.getPrimaryDataRecipients(taList1).type).toEqual(DataRecipientType.TRUSTED_ADVISER);
      expect(Helper.getPrimaryDataRecipients(taList2).type).toEqual(DataRecipientType.TRUSTED_ADVISER);
      expect(Helper.getPrimaryDataRecipients(taList3).type).toEqual(DataRecipientType.TRUSTED_ADVISER);
      expect(Helper.getPrimaryDataRecipients(taspList).type).toEqual(
        DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER,
      );
      expect(Helper.getPrimaryDataRecipients(taspList2).type).toEqual(
        DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER,
      );
      // @ts-expect-error invalidList contains invalid DataRecipients
      expect(Helper.getPrimaryDataRecipients(invalidList).type).toEqual('INVALID_01');
    });
  });

  describe('getAdrDataRecipients', () => {
    it('should get the adr dataRecipient, if it is not present return the primary data recipient', () => {
      const adrList = TestUtil.testData.dataRecipient.all();
      const adrOnlyList = [TestUtil.testData.dataRecipient.accreditedDataRecipient()];
      const noAdrOnlyList = [
        TestUtil.testData.dataRecipient.businessConsumerDisclosureConsent(),
        TestUtil.testData.dataRecipient.cdrRepresentative(),
        TestUtil.testData.dataRecipient.trustedAdvisor(),
        TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider(),
      ];

      expect(Helper.getAdrDataRecipients(adrList).type).toEqual(DataRecipientType.ACCREDITED_DATA_RECIPIENT);
      expect(Helper.getAdrDataRecipients(adrOnlyList).type).toEqual(DataRecipientType.ACCREDITED_DATA_RECIPIENT);
      expect(Helper.getAdrDataRecipients(noAdrOnlyList).type).toEqual(DataRecipientType.TRUSTED_ADVISER);
    });
  });

  describe('getNonAdrDataRecipients', () => {
    it('should get the non adr dataRecipient, if it is not present return undefined', () => {
      const drList = [
        TestUtil.testData.dataRecipient.accreditedDataRecipient(),
        TestUtil.testData.dataRecipient.nonAccreditedDataRecipient(),
      ];
      const adrOnlyList = [TestUtil.testData.dataRecipient.accreditedDataRecipient()];

      const nadr = Helper.getNonAdrDataRecipient(drList);

      expect(nadr?.type).toEqual(DataRecipientType.NON_ACCREDITED_PERSON);
      expect(Helper.getNonAdrDataRecipient(adrOnlyList)).toEqual(undefined);
    });
  });

  describe('getDataSharingRevocationEmail', () => {
    it('should get the correct data Sharing Revocation email', () => {
      const allDR = TestUtil.testData.dataRecipient.all();
      const adr = [TestUtil.testData.dataRecipient.accreditedDataRecipient()];
      const bcdc = [...adr, TestUtil.testData.dataRecipient.businessConsumerDisclosureConsent()];
      const cdr = [...adr, TestUtil.testData.dataRecipient.cdrRepresentative()];
      const grt = [...adr, TestUtil.testData.dataRecipient.granteeRepresentative()];
      const nap = [...adr, TestUtil.testData.dataRecipient.nonAccreditedDataRecipient()];
      const ta = [...adr, TestUtil.testData.dataRecipient.trustedAdvisor()];
      const tasp = [...adr, TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider()];

      expect(Helper.getDataSharingRevocationEmail(allDR)).toEqual(
        TestUtil.testData.dataRecipient.businessConsumerDisclosureConsent().dataSharingRevocationEmail,
      );
      expect(Helper.getDataSharingRevocationEmail(adr)).toEqual(
        TestUtil.testData.dataRecipient.accreditedDataRecipient().dataSharingRevocationEmail,
      );
      expect(Helper.getDataSharingRevocationEmail(bcdc)).toEqual(
        TestUtil.testData.dataRecipient.businessConsumerDisclosureConsent().dataSharingRevocationEmail,
      );
      expect(Helper.getDataSharingRevocationEmail(cdr)).toEqual(
        TestUtil.testData.dataRecipient.cdrRepresentative().dataSharingRevocationEmail,
      );
      expect(Helper.getDataSharingRevocationEmail(grt)).toEqual(
        TestUtil.testData.dataRecipient.granteeRepresentative().dataSharingRevocationEmail,
      );
      expect(Helper.getDataSharingRevocationEmail(nap)).toEqual(
        TestUtil.testData.dataRecipient.nonAccreditedDataRecipient().dataSharingRevocationEmail,
      );
      expect(Helper.getDataSharingRevocationEmail(ta)).toEqual(
        TestUtil.testData.dataRecipient.trustedAdvisor().dataSharingRevocationEmail,
      );
      expect(Helper.getDataSharingRevocationEmail(tasp)).toEqual(
        TestUtil.testData.dataRecipient.trustedAdvisorServiceProvider().dataSharingRevocationEmail,
      );
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

  describe('isConsentEditable', () => {
    it('should return false if a consent is not active', () => {
      let consent: ConsentResponse = { consentId: 'CID-1234-5678', status: Status.Expired };
      const useCase: UseCaseResponse = {
        sharingDurations: [SharingDuration.Custom],
        id: '',
        name: '',
        active: false,
        softwareProductId: '',
        description: '',
        priority: 0,
        historicalCollectionPeriodInDays: 0,
        notificationType: 'EMAIL',
        scopes: [],
        accessFrequency: 'ONCE_OFF',
        dataHolders: [],
        industries: [],
        consumerType: 'ALL',
      };

      expect(Helper.isConsentEditable(consent, useCase)).toBeFalsy();
      consent = { consentId: 'CID-1234-5678', status: Status.Requested };
      expect(Helper.isConsentEditable(consent, useCase)).toBeFalsy();
      consent = { consentId: 'CID-1234-5678', status: Status.Revoked };
      expect(Helper.isConsentEditable(consent, useCase)).toBeFalsy();
    });

    it('should return false if a use case does not have any Sharing Durations', () => {
      const consent: ConsentResponse = { consentId: 'CID-1234-5678', status: Status.Active };
      // @ts-ignore for testing purposes
      const useCase: UseCaseResponse = {};
      expect(Helper.isConsentEditable(consent, useCase)).toBeFalsy();
    });

    it('should return true if a use case one or more Sharing Durations and the consent is Active', () => {
      const consent: ConsentResponse = { consentId: 'CID-1234-5678', status: Status.Active };

      // @ts-ignore for testing purposes
      let useCase: UseCaseResponse = { sharingDurations: [SharingDuration.OneDay] };
      expect(Helper.isConsentEditable(consent, useCase)).toBeTruthy();
      // @ts-ignore for testing purposes
      useCase = { sharingDurations: [SharingDuration.SixMonths] };
      expect(Helper.isConsentEditable(consent, useCase)).toBeTruthy();
      // @ts-ignore for testing purposes
      useCase = { sharingDurations: [SharingDuration.Custom] };
      expect(Helper.isConsentEditable(consent, useCase)).toBeTruthy();
    });
  });
});
