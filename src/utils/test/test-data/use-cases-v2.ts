import { UseCaseResponse } from '@adatree/react-api-sdk-dashboard';
import {
  SharingDuration,
  AccessFrequency,
  NotificationType,
  Industry,
  ConsumerType,
} from '@adatree/react-api-sdk-dashboard';
import { dataHolder } from './data-holders';
import { outsourcedServiceProvider } from './outsourced-service-providers';
import { scope } from './scopes';

const onceOffConsentMinScopes = (): UseCaseResponse => {
  return {
    id: 'ONCE_OFF_CONSENT_MIN_SCOPES',
    name: 'Once Off Consent - Minimal Scopes',
    dataHolders: dataHolder.allBanking(),
    description: 'Data is used to test a once off consent scenario for minimal scopes and APIs',
    industries: [Industry.Banking],
    priority: 1,
    historicalCollectionPeriodInDays: 90,
    notificationType: NotificationType.Email,
    scopes: [
      scope.commonCustomerBasicRead(),
      scope.bankAccountsBasicRead(),
      scope.bankAccountsDetailRead(),
      scope.bankTransactionsRead(),
    ],
    accessFrequency: AccessFrequency.OnceOff,
    sharingDurations: [SharingDuration.OnceOff],
    active: true,
    softwareProductId: 'SPID-001',
    consumerType: 'INDIVIDUAL',
  };
};

const ongoingConsentMinScopes = (): UseCaseResponse => {
  return {
    id: 'ONGOING_CONSENT_MIN_SCOPES',
    name: 'Ongoing Consent - Minimal Scopes',
    dataHolders: dataHolder.allBanking(),
    description: 'Data is used to test an ongoing consent scenario for minimal scopes and APIs',
    industries: [Industry.Banking],
    priority: 1,
    historicalCollectionPeriodInDays: 90,
    notificationType: NotificationType.Email,
    scopes: [
      scope.commonCustomerBasicRead(),
      scope.bankAccountsBasicRead(),
      scope.bankAccountsDetailRead(),
      scope.bankTransactionsRead(),
    ],
    accessFrequency: AccessFrequency.Ongoing,
    sharingDurations: [SharingDuration.Custom, SharingDuration.OneWeek, SharingDuration.ThreeMonths],
    active: true,
    softwareProductId: 'SPID-001',
    consumerType: 'INDIVIDUAL',
  };
};

const homeLoan = (): UseCaseResponse => {
  return {
    id: 'HOME_LOAN',
    name: 'Home Loan Application',
    dataHolders: dataHolder.allBanking(),
    description: 'Data is used to assess your suitability for a home loan',
    industries: [Industry.Banking],
    priority: 1,
    historicalCollectionPeriodInDays: 90,
    notificationType: NotificationType.Email,
    scopes: [scope.bankAccountsBasicRead(), scope.bankTransactionsRead()],
    accessFrequency: AccessFrequency.OnceOff,
    sharingDurations: [SharingDuration.OnceOff],
    active: true,
    softwareProductId: 'SPID-001',
    consumerType: 'INDIVIDUAL',
  };
};

const consumerTypeOrg = (): UseCaseResponse => {
  return {
    id: 'CT_ORG',
    name: 'Consumer Type Organisation',
    dataHolders: dataHolder.allBanking(),
    description: 'Data is used to assess only for business disclosures.',
    industries: [Industry.Banking],
    priority: 1,
    historicalCollectionPeriodInDays: 90,
    notificationType: NotificationType.Email,
    consumerType: ConsumerType.Organisation,
    scopes: [scope.bankAccountsBasicRead(), scope.bankTransactionsRead()],
    accessFrequency: AccessFrequency.OnceOff,
    sharingDurations: [SharingDuration.SixMonths, SharingDuration.OneYear],
    active: true,
    softwareProductId: 'SPID-001',
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
    dataHolders: dataHolder.allEngery(),
    description: 'Your data will be used to assess the best energy provider for you',
    industries: [Industry.Energy],
    priority: 101,
    historicalCollectionPeriodInDays: 365,
    notificationType: NotificationType.Email,
    scopes: [
      scope.commonCustomerBasicRead(),
      scope.energyAccountsBasicRead(),
      scope.energyBillingRead(),
      scope.energyElectricityUsageRead(),
    ],
    accessFrequency: AccessFrequency.Ongoing,
    sharingDurations: [SharingDuration.Custom],
    active: true,
    softwareProductId: 'SPID-001',
    consumerType: 'INDIVIDUAL',
  };
};

const openEnergy = (): UseCaseResponse => {
  return {
    id: 'OPEN_ENERGY',
    name: 'Open Energy',
    dataHolders: dataHolder.allEngery(),
    description: 'Your data will be used to assess the best energy provider for you',
    industries: [Industry.Energy],
    priority: 100,
    historicalCollectionPeriodInDays: 365,
    notificationType: NotificationType.Email,
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
    accessFrequency: AccessFrequency.Ongoing,
    sharingDurations: [SharingDuration.Custom],
    active: true,
    softwareProductId: 'SPID-001',
    consumerType: 'INDIVIDUAL',
  };
};

const deIdentification = (): UseCaseResponse => {
  return {
    id: 'DE_IDENTIFICATION',
    name: 'De-identification use case example',
    dataHolders: dataHolder.allBanking(),
    description: 'Data is used to assess your suitability and is de-identified on deletion',
    //@ts-ignore
    features: ['DE_IDENTIFICATION'],
    industries: [Industry.Banking],
    priority: 1,
    historicalCollectionPeriodInDays: 90,
    notificationType: NotificationType.Email,
    scopes: [scope.bankAccountsBasicRead(), scope.bankTransactionsRead()],
    accessFrequency: AccessFrequency.OnceOff,
    sharingDurations: [SharingDuration.OnceOff],
    active: true,
    softwareProductId: 'SPID-001',
    consumerType: 'INDIVIDUAL',
  };
};

const all = (): UseCaseResponse[] => [
  onceOffConsentMinScopes(),
  ongoingConsentMinScopes(),
  homeLoan(),
  consumerTypeOrg(),
  openEnergyLite(),
  openEnergy(),
  deIdentification(),
];

export const useCaseV2 = {
  all,
  onceOffConsentMinScopes,
  ongoingConsentMinScopes,
  homeLoan,
  consumerTypeOrg,
  homeLoanWithOsps,
  openEnergyLite,
  openEnergy,
  deIdentification,
};
