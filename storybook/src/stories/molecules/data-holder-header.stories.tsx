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
  consent: TestUtil.testData.consent.active(),
  dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
  onRevokeClick: () => {
    alert(`The revoke button was clicked`);
  },
};

export const WithActiveStatusAndExtendableDate = Template.bind({});
WithActiveStatusAndExtendableDate.args = {
  consent: TestUtil.testData.consent.active(),
  isExtendable: true,
  dataHolderLogoUrl: TestUtil.testData.dataHolder.yellowBank().logoUri,
  extendableUrl: '/?path=/story/components-molecules-data-holder-header--with-active-status-and-extendable-date',
  onRevokeClick: () => {
    alert(`The revoke button was clicked`);
  },
};

export const WithExpiredStatus = Template.bind({});
WithExpiredStatus.args = {
  consent: TestUtil.testData.consent.expired(),
  dataHolderLogoUrl: TestUtil.testData.dataHolder.redBank().logoUri,
};

export const WithRequestedStatus = Template.bind({});
WithRequestedStatus.args = {
  consent: TestUtil.testData.consent.requested(),
  dataHolderLogoUrl: TestUtil.testData.dataHolder.redBank().logoUri,
};

export const WithRevokedStatus = Template.bind({});
WithRevokedStatus.args = {
  consent: TestUtil.testData.consent.revoked(),
  dataHolderLogoUrl: TestUtil.testData.dataHolder.redBank().logoUri,
};
