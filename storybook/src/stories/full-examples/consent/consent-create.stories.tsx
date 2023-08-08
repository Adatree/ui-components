import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  ConsentCreate,
  SharingDuration,
  TestUtil,
  UseCaseResponse,
} from '../../../lib';

const handleSummit = () => {
  alert('Consent submitted');
};

const handleCancel = () => {
  alert('Consent canceled');
};

export default {
  title: 'Full examples/Create consent',
  component: ConsentCreate,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    existingConsents: TestUtil.testData.consent.all(),
    onCancel: handleCancel,
    onSubmit: handleSummit,
  },
} as ComponentMeta<typeof ConsentCreate>;

const baseConsentFormValues = {
  accessFrequency: undefined,
  allAddScopesChecked: false,
  allRemoveScopesChecked: false,
  dataHolder: undefined,
  insightsConfirmation: false,
  selectedSharingDurations: undefined,
  postUsageAction: undefined,
  sharingEndDate: undefined,
  useCaseId: undefined,
};

const getFavouriteDataHolders = (industy: string) => {
  if (industy === 'Energy') {
    return TestUtil.testData.dataHolder.allEngery();
  } else {
    return TestUtil.testData.dataHolder.allBanking();
  }
};

const getUseCase = (industy: string): UseCaseResponse => {
  if (industy === 'Energy') {
    return TestUtil.testData.useCase.openEnergyLite();
  } else {
    return TestUtil.testData.useCase.homeLoan();
  }
};

const Template: ComponentStory<typeof ConsentCreate> = (args) => <ConsentCreate {...args} />;

// ########################################################################

export const WithOngoingAccess = Template.bind({});
WithOngoingAccess.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
      sharingDurations: [SharingDuration.ThreeMonths],
      accessFrequency: AccessFrequency.Ongoing,
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithOnceOffAccess = Template.bind({});
WithOnceOffAccess.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
      sharingDurations: [SharingDuration.OnceOff],
      accessFrequency: AccessFrequency.OnceOff,
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithSupportingParties = Template.bind({});
WithSupportingParties.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
      osps: TestUtil.testData.outsourcedServiceProvider.all(),
      sharingDurations: [SharingDuration.OnceOff],
      accessFrequency: AccessFrequency.OnceOff,
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithLongScopes = Template.bind({});
WithLongScopes.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
      scopes: [
        TestUtil.testData.scope.commonCustomerBasicRead(),
        TestUtil.testData.scope.commonCustomerDetailRead(),
        TestUtil.testData.scope.energyAccountsBasicRead(),
        TestUtil.testData.scope.energyAccountsDetailRead(),
        TestUtil.testData.scope.energyAccountsConcessionsRead(),
        TestUtil.testData.scope.energyAccountsPaymentscheduleRead(),
        TestUtil.testData.scope.energyBillingRead(),
        TestUtil.testData.scope.energyElectricityServicepointsBasicRead(),
        TestUtil.testData.scope.energyElectricityServicepointsDetailRead(),
        TestUtil.testData.scope.energyElectricityDerRead(),
        TestUtil.testData.scope.energyElectricityUsageRead(),
      ],
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithMultiDatesAndCustom = Template.bind({});
WithMultiDatesAndCustom.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = TestUtil.testData.useCase.ongoingConsentMinScopes();

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithDeIdentifySection = Template.bind({});
WithDeIdentifySection.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
      features: ['DE_IDENTIFICATION'],
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithInsightsSingle = Template.bind({});
WithInsightsSingle.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
      sharingDurations: [SharingDuration.OnceOff],
      accessFrequency: AccessFrequency.OnceOff,
    };
    context.args.insightResponse = TestUtil.testData.insights.single();

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

export const WithInsightsMany = Template.bind({});
WithInsightsMany.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
      sharingDurations: [SharingDuration.OnceOff],
      accessFrequency: AccessFrequency.OnceOff,
    };
    context.args.insightResponse = TestUtil.testData.insights.all();

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithNoFavouriteDataHolders = Template.bind({});
WithNoFavouriteDataHolders.decorators = [
  (Story, context) => {
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
    };
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithBlockedRedBank = Template.bind({});
WithBlockedRedBank.decorators = [
  (Story, context) => {
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
    };
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.blockedDataHolderList = [TestUtil.testData.dataHolder.redBank()];

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithNoDataHolderListed = Template.bind({});
WithNoDataHolderListed.decorators = [
  (Story, context) => {
    context.args.useCase = {
      ...getUseCase(context.globals.industry),
    };
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.onNotListedClick = () => {
      alert('No data holder listed clicked');
    };
    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];

// ########################################################################

export const WithNoRemainingDataHolders = Template.bind({});
WithNoRemainingDataHolders.decorators = [
  (Story, context) => {
    let useCaseId = getUseCase(context.globals.industry).id;

    if (!useCaseId) {
      useCaseId = '';
    }

    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = getUseCase(context.globals.industry);
    context.args.existingConsents = [
      ...TestUtil.testData.consent.all(),
      ...[
        TestUtil.testData.consent.generateConsent({
          dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
          useCaseId: useCaseId,
          sharingEndDate: new Date().toISOString(),
        }),
        TestUtil.testData.consent.generateConsent({
          dataHolderBrandId: '9a9cea5d-19c4-458b-ab79-c926455475d3',
          useCaseId: useCaseId,
          sharingEndDate: new Date().toISOString(),
        }),
        TestUtil.testData.consent.generateConsent({
          dataHolderBrandId: '7a7cea5d-19c4-458b-ab79-c926455475d3',
          useCaseId: useCaseId,
          sharingEndDate: new Date().toISOString(),
        }),
        TestUtil.testData.consent.generateConsent({
          dataHolderBrandId: '8a8cea5d-19c4-458b-ab79-c926455475d3',
          useCaseId: useCaseId,
          sharingEndDate: new Date().toISOString(),
        }),
      ],
    ];

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <Story />
      </ConsentFormProvider>
    );
  },
];
