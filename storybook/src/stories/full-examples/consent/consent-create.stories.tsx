import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AccessFrequency,
  ConsentFormProvider,
  ConsentCreate,
  PostUsageAction,
  SharingDuration,
  TestUtil,
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
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.DELETION,
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

const Template: ComponentStory<typeof ConsentCreate> = (args) => <ConsentCreate {...args} />;

// ########################################################################

export const WithOngoingAccess = Template.bind({});
WithOngoingAccess.decorators = [
  (Story, context) => {
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = {
      ...TestUtil.testData.useCase.homeLoan(),
      sharingDurations: [SharingDuration.THREEMONTHS],
      accessFrequency: AccessFrequency.ONGOING,
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
      ...TestUtil.testData.useCase.homeLoan(),
      sharingDurations: [SharingDuration.ONCEOFF],
      accessFrequency: AccessFrequency.ONCEOFF,
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
      ...TestUtil.testData.useCase.homeLoanWithOsps(),
      sharingDurations: [SharingDuration.ONCEOFF],
      accessFrequency: AccessFrequency.ONCEOFF,
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
    context.args.useCase = TestUtil.testData.useCase.openEnergy();

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

export const WithNoFavouriteDataHolders = Template.bind({});
WithNoFavouriteDataHolders.decorators = [
  (Story, context) => {
    context.args.useCase = TestUtil.testData.useCase.ongoingConsentMinScopes();

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
    context.args.favouriteDataHolders = getFavouriteDataHolders(context.globals.industry);
    context.args.useCase = TestUtil.testData.useCase.homeLoan();
    context.args.existingConsents = [
      ...TestUtil.testData.consent.all(),
      ...[
        TestUtil.testData.consent.generateConsent({
          dataHolderBrandId: 'a3e0c26a-db81-491f-bfb2-90ea2da621c8',
          useCaseId: TestUtil.testData.useCase.homeLoan().id,
        }),
        TestUtil.testData.consent.generateConsent({
          dataHolderBrandId: '7a7cea5d-19c4-458b-ab79-c926455475d3',
          useCaseId: TestUtil.testData.useCase.homeLoan().id,
        }),
        TestUtil.testData.consent.generateConsent({
          dataHolderBrandId: '8a8cea5d-19c4-458b-ab79-c926455475d3',
          useCaseId: TestUtil.testData.useCase.homeLoan().id,
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
