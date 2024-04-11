import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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

const meta: Meta<typeof ConsentCreate> = {
  title: 'Full examples/Create consent',
  component: ConsentCreate,
  parameters: {
    layout: 'centered',
  },
  args: {
    existingConsents: TestUtil.testData.consent.all(),
    onCancel: handleCancel,
    onSubmit: handleSummit,
  },

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentCreate>;

const baseConsentFormValues = {
  accessFrequency: undefined,
  allAddScopesChecked: true,
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

// ########################################################################

export const WithOngoingAccess: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
      sharingDurations: [SharingDuration.ThreeMonths],
      accessFrequency: AccessFrequency.Ongoing,
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithOnceOffAccess: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
      sharingDurations: [SharingDuration.OnceOff],
      accessFrequency: AccessFrequency.OnceOff,
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithSupportingParties: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
      osps: TestUtil.testData.outsourcedServiceProvider.all(),
      sharingDurations: [SharingDuration.OnceOff],
      accessFrequency: AccessFrequency.OnceOff,
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithLongScopes: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
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
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithMultiDatesAndCustom: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = TestUtil.testData.useCase.ongoingConsentMinScopes();

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithDeIdentifySection: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
      features: ['DE_IDENTIFICATION'],
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithInsightsSingle: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
      sharingDurations: [SharingDuration.OnceOff],
      accessFrequency: AccessFrequency.OnceOff,
    };
    args.insightResponse = TestUtil.testData.insights.single();

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithInsightsMany: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
      sharingDurations: [SharingDuration.OnceOff],
      accessFrequency: AccessFrequency.OnceOff,
    };
    args.insightResponse = TestUtil.testData.insights.all();

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithNoFavouriteDataHolders: Story = {
  render: (args, { globals: { industry } }) => {
    args.useCase = {
      ...getUseCase(industry),
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithBlockedRedBank: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
    };
    args.blockedDataHolderList = [TestUtil.testData.dataHolder.redBank()];

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithDataHolderPreselected: Story = {
  render: (args, { globals: { industry } }) => {
    args.useCase = {
      ...getUseCase(industry),
    };
    args.dataHolderId = getFavouriteDataHolders(industry)[0].dataHolderBrandId;

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithNoDataHolderListed: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = {
      ...getUseCase(industry),
    };
    args.onNotListedClick = () => {
      alert('No data holder listed clicked');
    };

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithConsumerTypeOrganisation: Story = {
  render: (args, { globals: { industry } }) => {
    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = TestUtil.testData.useCase.consumerTypeOrg();

    return (
      <ConsentFormProvider initialValues={{ ...baseConsentFormValues }}>
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};

// ########################################################################

export const WithNoRemainingDataHolders: Story = {
  render: (args, { globals: { industry } }) => {
    let useCaseId = getUseCase(industry).id;

    if (!useCaseId) {
      useCaseId = '';
    }

    args.favouriteDataHolders = getFavouriteDataHolders(industry);
    args.useCase = getUseCase(industry);
    args.existingConsents = [
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
        <ConsentCreate {...args} />
      </ConsentFormProvider>
    );
  },
};
