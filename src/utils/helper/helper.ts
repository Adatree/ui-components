import { DataHolder } from '../..';
import { DateDuration } from '../../atoms/date-button/date-button.atom';
import { SharingDuration } from '../../enums/sharingDuration.enum';
import { AccessFrequency, ConsentResponse, Status, UseCaseResponse } from '../../generated/consent';

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
  dataHolders: DataHolder[],
  consents: ConsentResponse[],
  useCase: UseCaseResponse,
): DataHolder[] => {
  const filteredDataHolders = dataHolders.filter((dataHolder) => {
    return !doesConsentExistForDataHolderAndUseCase(dataHolder, consents, useCase);
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

const unselectDateDurations = (duration: DateDuration[]): DateDuration[] => {
  return duration.map((duration) => {
    return { ...duration, isSelected: false };
  });
};

const accessFrequencyToString = (accessFrequency: AccessFrequency): string => {
  if (accessFrequency === AccessFrequency.ONCEOFF) {
    return 'Once-off';
  }

  return accessFrequency.charAt(0).toUpperCase() + accessFrequency.slice(1).toLowerCase();
};

const sharingDurationToDateDuration = (sharingDuration: SharingDuration): DateDuration | undefined => {
  console.log(sharingDuration);
  if (sharingDuration === SharingDuration.CUSTOM || sharingDuration === SharingDuration.ONCE_OFF) {
    return undefined;
  }

  let unit: 'd' | 'w' | 'm' | 'y' = 'd';
  let value = 0;

  const sharingDurationParts = sharingDuration.toString().split('_');

  if (sharingDurationParts[1].startsWith('DAY')) {
    unit = 'd';
  } else if (sharingDurationParts[1].startsWith('WEEK')) {
    unit = 'w';
  } else if (sharingDurationParts[1].startsWith('MONTH')) {
    unit = 'm';
  } else if (sharingDurationParts[1].startsWith('YEAR')) {
    unit = 'y';
  }

  if (sharingDurationParts[0] === 'ONE') {
    value = 1;
  } else if (sharingDurationParts[0] === 'TWO') {
    value = 2;
  } else if (sharingDurationParts[0] === 'THREE') {
    value = 3;
  } else if (sharingDurationParts[0] === 'SIX') {
    value = 6;
  } else if (sharingDurationParts[0] === 'NINE') {
    value = 9;
  }

  return { unit, value };
};

export const Helper = {
  accessFrequencyToString,
  unselectDateDurations,
  filterDataHoldersByConsentsAndUseCase,
  filterListbyStatus,
  sharingDurationToDateDuration,
  sortListbyDate,
};
