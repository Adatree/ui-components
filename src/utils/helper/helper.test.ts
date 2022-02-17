import { Helper } from './helper';
import { TestUtil } from '../test/test.util';
import { Status } from '../../generated/consent';

describe('Helper Utils', () => {
  TestUtil.suspendLogger();

  it('should sort a list of Consents by date', () => {
    const list = TestUtil.getTestDataConsentResponses();

    const sortedList = Helper.sortListbyDate(list);

    expect(sortedList[0].consentId).toEqual('b89ce648-1589-470c-8829-9955379fc5fc');
    expect(sortedList[1].consentId).toEqual('550b2d5a-2c52-4213-a9eb-3abe467d99a9');
    expect(sortedList[2].consentId).toEqual('6e485649-3113-468d-8067-5f18580476f6');
    expect(sortedList[3].consentId).toEqual('f328b2fb-441e-951d-2f9e-2296af82cae1');
    expect(sortedList[4].consentId).toEqual('abc8d9c3-6527-4349-a8fb-d1f7f90f225d');
    expect(sortedList[5].consentId).toEqual('3ad2f7ce-18f4-451f-afb6-0077b339ddb4');
  });

  it('should format date string into a human readable format', () => {
    const list = TestUtil.getTestDataConsentResponses();

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
    it('should filter DataHolders if a consent exist with that dataholder and use case', () => {
      const dataHolders = TestUtil.getTestDataAllDataHolders();
      const consents = TestUtil.getTestDataConsentResponses();
      const homeUseCase = TestUtil.getTestDataHomeUseCase();
      const budgetingToolUseCase = TestUtil.getTestDataBudgetingToolUseCase();

      const filteredByHomeUseCase = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, homeUseCase);

      expect(filteredByHomeUseCase.length).toEqual(1);
      expect(filteredByHomeUseCase[0].brandName).toEqual('Yellow Bank of Australia');

      const filteredByBudgetingToolUseCase = Helper.filterDataHoldersByConsentsAndUseCase(
        dataHolders,
        consents,
        budgetingToolUseCase,
      );

      expect(filteredByBudgetingToolUseCase.length).toEqual(1);
      expect(filteredByBudgetingToolUseCase[0].brandName).toEqual('Red Australia Bank');
    });

    it('should not filter DataHolders if use case is invalid', () => {
      const dataHolders = TestUtil.getTestDataAllDataHolders();
      const consents = TestUtil.getTestDataConsentResponses();
      const useCase = TestUtil.getTestDataHomeUseCase();
      useCase.id = undefined;

      const filteredDataHolders01 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, useCase);
      expect(filteredDataHolders01).toEqual(dataHolders);

      const filteredDataHolders02 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, consents, {});
      expect(filteredDataHolders02).toEqual(dataHolders);
    });

    it('should not filter DataHolders if consents are invalid', () => {
      const dataHolders = TestUtil.getTestDataAllDataHolders();
      const useCase = TestUtil.getTestDataHomeUseCase();

      let consent = TestUtil.getTestDataConsentResponse();
      consent.status = undefined;
      const filteredDataHolders01 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders01).toEqual(dataHolders);

      consent = TestUtil.getTestDataConsentResponse();
      consent.dataHolderBrandId = undefined;
      const filteredDataHolders02 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders02).toEqual(dataHolders);

      consent = TestUtil.getTestDataConsentResponse();
      consent.useCase = undefined;
      const filteredDataHolders03 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders03).toEqual(dataHolders);

      consent = TestUtil.getTestDataConsentResponse();
      consent.useCase = { ...consent.useCase, id: undefined };
      const filteredDataHolders04 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [consent], useCase);
      expect(filteredDataHolders04).toEqual(dataHolders);

      const filteredDataHolders05 = Helper.filterDataHoldersByConsentsAndUseCase(dataHolders, [], useCase);
      expect(filteredDataHolders05).toEqual(dataHolders);
    });
  });
});
