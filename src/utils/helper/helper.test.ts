import { Helper } from './list';
import { TestUtil } from '../test/test.util';
import { Status } from '../../generated/consent';

describe('List Utils', () => {
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
});
