import { DateOption } from '../../atoms/date-button/date-button.atom';
import { ConsentResponse, Status } from '../../generated/consent';

const sortListbyDate = (list: ConsentResponse[]): ConsentResponse[] => {
  return list.sort((a, b) => {
    const sortDateA = getConsentSortingDate(a);
    const sortDateB = getConsentSortingDate(b);

    if (sortDateA && sortDateB) {
      return sortDateA < sortDateB ? 1 : -1;
    }
    return 0;
  });
};

const getConsentSortingDate = (consent: ConsentResponse): string | undefined => {
  let sortDate = consent.created;

  if (consent.status === Status.EXPIRED) {
    sortDate = consent.sharingEndDate;
  }
  if (consent.status === Status.REVOKED) {
    sortDate = consent.revoked;
  }

  return sortDate;
};

const filterListbyStatus = (list: ConsentResponse[], filterBy: Status): ConsentResponse[] => {
  return list.filter((consent: ConsentResponse) => consent.status === filterBy);
};

const clearDateOptions = (options: DateOption[]): DateOption[] => {
  return options.map((option) => {
    return { ...option, isSelected: false };
  });
};

export const Helper = {
  clearDateOptions,
  filterListbyStatus,
  sortListbyDate,
};
