import { DateDuration, DateDurationList } from '../../consts/duration.const';
import {
  AccessFrequency,
  ConsentResponse,
  SharingDuration,
  Status,
  UseCaseResponse,
  DataHolder,
  ScopeResponse,
} from '../../generated/consent';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { DataRecipient, DataRecipientType } from '../../types/data-recipient.type';

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

  if (consent.status === Status.Expired) {
    sortDate = consent.sharingEndDate;
  }
  if (consent.status === Status.Revoked) {
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
      consent.status === Status.Active &&
      consent.useCase?.id === useCase.id &&
      consent.dataHolderBrandId === dataHolder.dataHolderBrandId
    );
  });
  return alreadyExists.length > 0;
};

const accessFrequencyToString = (accessFrequency: AccessFrequency): string => {
  if (accessFrequency === AccessFrequency.OnceOff) {
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
  const durations: DateDuration[] = [];

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

/**
 * Compares the compareWithBaseScopes to baseScopes
 * @param baseScopes
 * @param compareWithBaseScopes
 * @returns [] for equal or [ScopeResponse] if compareWithBaseScopes has a difference.
 */
const getScopeDifference = (baseScopes: ScopeResponse[], compareWithBaseScopes: ScopeResponse[]): ScopeResponse[] => {
  const difference = compareWithBaseScopes.filter(
    (compareWithBaseScope) => !baseScopes.some((baseScope) => compareWithBaseScope.id === baseScope.id),
  );
  return difference;
};

const isConsentEditable = (consent: ConsentResponse, useCase: UseCaseResponse): boolean => {
  if (!useCase.sharingDurations || consent.status !== Status.Active) {
    return false;
  }

  // ADA-3005: API does not support updating scopes
  // if (consent.useCase && consent.useCase.scopes && useCase.scopes) {
  //   const differenceA = getScopeDifference(consent.useCase?.scopes, useCase.scopes);
  //   const differenceB = getScopeDifference(useCase.scopes, consent.useCase?.scopes);

  //   if (differenceA.length > 0 || differenceB.length > 0) {
  //     return true;
  //   }
  // }

  return true;
};

const getPrimaryDataRecipients = (dataRecipients: DataRecipient[]): DataRecipient => {
  if (dataRecipients.length === 1) {
    return dataRecipients[0];
  }

  const foundGrantee = dataRecipients.find((dataRecipient) => {
    return dataRecipient.type === DataRecipientType.GRANTEE;
  });

  if (foundGrantee) {
    return foundGrantee;
  }

  const foundTrustedAdviser = dataRecipients.find((dataRecipient) => {
    return dataRecipient.type === DataRecipientType.TRUSTED_ADVISER;
  });

  if (foundTrustedAdviser) {
    return foundTrustedAdviser;
  }

  const foundTrustedAdviserServiceProvider = dataRecipients.find((dataRecipient) => {
    return dataRecipient.type === DataRecipientType.TRUSTED_ADVISER_SERVICE_PROVIDER;
  });

  if (foundTrustedAdviserServiceProvider) {
    return foundTrustedAdviserServiceProvider;
  }

  const foundCdrRepresentative = dataRecipients.find((dataRecipient) => {
    return dataRecipient.type === DataRecipientType.CDR_REPRESENTATIVE;
  });

  if (foundCdrRepresentative) {
    return foundCdrRepresentative;
  }

  const foundAccreditedDataRecipient = dataRecipients.find((dataRecipient) => {
    return dataRecipient.type === DataRecipientType.ACCREDITED_DATA_RECIPIENT;
  });

  if (foundAccreditedDataRecipient) {
    return foundAccreditedDataRecipient;
  }

  return dataRecipients[0];
};

const getAdrDataRecipients = (dataRecipients: DataRecipient[]): DataRecipient => {
  const found = dataRecipients.find((dataRecipient) => {
    return dataRecipient.type === DataRecipientType.ACCREDITED_DATA_RECIPIENT;
  });

  if (found) {
    return found;
  } else {
    return getPrimaryDataRecipients(dataRecipients);
  }
};

export const Helper = {
  accessFrequencyToString,
  dateDurationToDate,
  filterDataHoldersByConsentsAndUseCase,
  filterListbyStatus,
  getAdrDataRecipients,
  getPrimaryDataRecipients,
  getScopeDifference,
  isConsentEditable,
  parseSharingDuration,
  parseSharingDurations,
  sharingDurationToDate,
  sharingDurationToString,
  sortListbyDate,
};
