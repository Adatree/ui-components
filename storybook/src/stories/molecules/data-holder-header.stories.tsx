import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DataHolderHeader, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Data Holder header',
  component: DataHolderHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataHolderHeader>;

const Template: ComponentStory<typeof DataHolderHeader> = (args) => <DataHolderHeader {...args} />;

export const WithActiveStatus = Template.bind({});
WithActiveStatus.args = {
  consent: TestUtil.getTestDataConsentResponses()[0],
  dataHolderLogoUrl: TestUtil.getTestDataYellowBankDataHolder().logoUri,
  onRevokeClick: () => {
    alert(`The revoke button was clicked`);
  },
};

export const WithActiveStatusAndExtendableDate = Template.bind({});
WithActiveStatusAndExtendableDate.args = {
  consent: TestUtil.getTestDataConsentResponses()[0],
  isExtendable: true,
  dataHolderLogoUrl: TestUtil.getTestDataYellowBankDataHolder().logoUri,
  extendableUrl: '/?path=/story/components-molecules-data-holder-header--with-active-status-and-extendable-date',
  onRevokeClick: () => {
    alert(`The revoke button was clicked`);
  },
};

export const WithRevokedStatus = Template.bind({});
WithRevokedStatus.args = {
  consent: TestUtil.getTestDataConsentResponses()[2],
  dataHolderLogoUrl: TestUtil.getTestDataRedBankDataHolder().logoUri,
};

export const WithRequestedStatus = Template.bind({});
WithRequestedStatus.args = {
  consent: TestUtil.getTestDataConsentResponses()[3],
  dataHolderLogoUrl: TestUtil.getTestDataRedBankDataHolder().logoUri,
};

export const WithExpiredStatus = Template.bind({});
WithExpiredStatus.args = {
  consent: TestUtil.getTestDataConsentResponses()[4],
  dataHolderLogoUrl: TestUtil.getTestDataRedBankDataHolder().logoUri,
};
