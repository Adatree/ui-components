import { DateDuration, DateDurationList } from '../../consts/duration.const';
import {
  AccessFrequency,
  ConsentResponse,
  SharingDuration,
  Status,
  UseCaseResponse,
  DataHolder,
} from '../../generated/consent';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { isEqual } from 'lodash';

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

const filterDataHoldersByConsentsAndUseCase = (
  dataHolders: DataHolder[] | undefined,
  consents: ConsentResponse[],
  useCase: UseCaseResponse,
): DataHolder[] => {
  if (!dataHolders) {
    return [];
  }

  const filteredDataHolders = dataHolders.filter((dataHolder) => {
    return doesConsentExistForDataHolderAndUseCase(dataHolder, consents, useCase);
  });

  return filteredDataHolders;
};

const doesConsentExistForDataHolderAndUseCase = (
  dataHolder: DataHolder,
  consents: ConsentResponse[],
  useCase: UseCaseResponse,
): boolean => {
  const alreadyExists = consents.filter((consent) => {
    return (
      consent.status === Status.ACTIVE &&
      consent.useCase?.id === useCase.id &&
      consent.dataHolderBrandId === dataHolder.dataHolderBrandId
    );
  });
  return alreadyExists.length > 0;
};

const accessFrequencyToString = (accessFrequency: AccessFrequency): string => {
  if (accessFrequency === AccessFrequency.ONCEOFF) {
    return 'Once-off';
  }

  return accessFrequency.charAt(0).toUpperCase() + accessFrequency.slice(1).toLowerCase();
};

const parseSharingDuration = (sharingDuration: SharingDuration): DateDuration | undefined => {
  const duration = DateDurationList.find((duration) => {
    return duration.type === sharingDuration;
  });

  return duration;
};

const parseSharingDurations = (sharingDurations: SharingDuration[]): DateDuration[] => {
  let durations: DateDuration[] = [];

  sharingDurations.forEach((sharingDuration) => {
    const found = DateDurationList.find((duration) => {
      return duration.type === sharingDuration;
    });

    if (found !== undefined) {
      durations.push(found);
    }
  });

  return durations;
};

const sharingDurationToString = (sharingDuration: SharingDuration): string | undefined => {
  const dateDuration = DateDurationList.find((duration) => {
    return duration.type === sharingDuration;
  });

  if (dateDuration) {
    return dateDuration.text;
  } else {
    return undefined;
  }
};

const sharingDurationToDate = (sharingDuration: SharingDuration): Date => {
  const duration = parseSharingDuration(sharingDuration);
  const curDate = new Date();
  let newDate = new Date();

  if (duration) {
    if (duration.unit === 'd') {
      newDate = addDays(curDate, duration.value);
    } else if (duration.unit === 'w') {
      newDate = addWeeks(curDate, duration.value);
    } else if (duration.unit === 'm') {
      newDate = addMonths(curDate, duration.value);
    } else if (duration.unit === 'y') {
      newDate = addYears(curDate, duration.value);
    }
  }

  return newDate;
};

const dateDurationToDate = (duration: DateDuration): Date => {
  const curDate = new Date();
  let newDate = new Date();

  if (duration.unit === 'd') {
    newDate = addDays(curDate, duration.value);
  } else if (duration.unit === 'w') {
    newDate = addWeeks(curDate, duration.value);
  } else if (duration.unit === 'm') {
    newDate = addMonths(curDate, duration.value);
  } else if (duration.unit === 'y') {
    newDate = addYears(curDate, duration.value);
  }

  return newDate;
};

const isConsentEditable = (consent: ConsentResponse, useCase: UseCaseResponse): boolean => {
  console.log(consent, useCase);
  if (!useCase.sharingDurations) {
    return false;
  }

  if (useCase.sharingDurations.includes(SharingDuration.CUSTOM)) {
    return true;
  }

  if (useCase.sharingDurations.length === 1 && isEqual(useCase.sharingDurations, consent.useCase?.sharingDurations)) {
    return false;
  }

  return true;
};
export const Helper = {
  accessFrequencyToString,
  dateDurationToDate,
  filterDataHoldersByConsentsAndUseCase,
  filterListbyStatus,
  isConsentEditable,
  parseSharingDuration,
  parseSharingDurations,
  sharingDurationToDate,
  sharingDurationToString,
  sortListbyDate,
};
