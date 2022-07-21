import {
  UseCaseResponse,
  SharingDuration,
  AccessFrequency,
  NotificationType,
  Industry,
} from '../../../generated/consent/api';
import { dataHolder } from './data-holders';
import { outsourcedServiceProvider } from './outsourced-service-providers';
import { scope } from './scopes';

const onceOffConsentMinScopes = (): UseCaseResponse => {
  return {
    id: 'ONCE_OFF_CONSENT_MIN_SCOPES',
    name: 'Once Off Consent - Minimal Scopes',
    dataHolders: dataHolder.all(),
    description: 'Data is used to test a once off consent scenario for minimal scopes and APIs',
    industries: [Industry.BANKING],
    priority: 1,
    historicalCollectionPeriodInDays: 90,
    notificationType: NotificationType.EMAIL,
    scopes: [
      scope.commonCustomerBasicRead(),
      scope.bankAccountsBasicRead(),
      scope.bankAccountsDetailRead(),
      scope.bankTransactionsRead(),
    ],
    accessFrequency: AccessFrequency.ONCEOFF,
    sharingDurations: [SharingDuration.ONCEOFF],
  };
};
const ongoingConsentMinScopes = (): UseCaseResponse => {
  return {
    id: 'ONGOING_CONSENT_MIN_SCOPES',
    name: 'Ongoing Consent - Minimal Scopes',
    dataHolders: dataHolder.all(),
    description: 'Data is used to test an ongoing consent scenario for minimal scopes and APIs',
    industries: [Industry.BANKING],
    priority: 1,
    historicalCollectionPeriodInDays: 90,
    notificationType: NotificationType.EMAIL,
    scopes: [
      scope.commonCustomerBasicRead(),
      scope.bankAccountsBasicRead(),
      scope.bankAccountsDetailRead(),
      scope.bankTransactionsRead(),
    ],
    accessFrequency: AccessFrequency.ONGOING,
    sharingDurations: [SharingDuration.CUSTOM, SharingDuration.ONEWEEK, SharingDuration.THREEMONTHS],
  };
};

const homeLoan = (): UseCaseResponse => {
  return {
    id: 'HOME_LOAN',
    name: 'Home Loan Application',
    dataHolders: dataHolder.all(),
    description: 'Data is used to assess your suitability for a home loan',
    industries: [Industry.BANKING],
    priority: 1,
    historicalCollectionPeriodInDays: 90,
    notificationType: NotificationType.EMAIL,
    scopes: [scope.bankAccountsBasicRead(), scope.bankTransactionsRead()],
    accessFrequency: AccessFrequency.ONCEOFF,
    sharingDurations: [SharingDuration.ONCEOFF],
  };
};

const homeLoanWithOsps = (): UseCaseResponse => {
  return {
    ...homeLoan(),
    osps: outsourcedServiceProvider.all(),
  };
};

const openEnergyLite = (): UseCaseResponse => {
  return {
    id: 'OPEN_ENERGY_LITE',
    name: 'Open Energy Lite',
    dataHolders: dataHolder.all(),
    description: 'Your data will be used to assess the best energy provider for you',
    industries: [Industry.ENERGY],
    priority: 101,
    historicalCollectionPeriodInDays: 365,
    notificationType: NotificationType.EMAIL,
    scopes: [
      scope.commonCustomerBasicRead(),
      scope.energyAccountsBasicRead(),
      scope.energyBillingRead(),
      scope.energyElectricityUsageRead(),
    ],
    accessFrequency: AccessFrequency.ONGOING,
    sharingDurations: [SharingDuration.CUSTOM],
  };
};

const openEnergy = (): UseCaseResponse => {
  return {
    id: 'OPEN_ENERGY',
    name: 'Open Energy',
    dataHolders: dataHolder.all(),
    description: 'Your data will be used to assess the best energy provider for you',
    industries: [Industry.ENERGY],
    priority: 100,
    historicalCollectionPeriodInDays: 365,
    notificationType: NotificationType.EMAIL,
    scopes: [
      scope.commonCustomerBasicRead(),
      scope.commonCustomerDetailRead(),
      scope.energyAccountsBasicRead(),
      scope.energyAccountsDetailRead(),
      scope.energyAccountsConcessionsRead(),
      scope.energyAccountsPaymentscheduleRead(),
      scope.energyBillingRead(),
      scope.energyElectricityServicepointsBasicRead(),
      scope.energyElectricityServicepointsDetailRead(),
      scope.energyElectricityDerRead(),
      scope.energyElectricityUsageRead(),
    ],
    accessFrequency: AccessFrequency.ONGOING,
    sharingDurations: [SharingDuration.CUSTOM],
  };
};

const all = (): UseCaseResponse[] => [
  onceOffConsentMinScopes(),
  ongoingConsentMinScopes(),
  homeLoan(),
  openEnergyLite(),
  openEnergy(),
];

export const useCase = {
  all,
  onceOffConsentMinScopes,
  ongoingConsentMinScopes,
  homeLoan,
  homeLoanWithOsps,
  openEnergyLite,
  openEnergy,
};
