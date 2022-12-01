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
  onRevokeClick: () => {
    alert(`The revoke button was clicked`);
  },
};

export const WithActiveStatusAndGrantee = Template.bind({});
WithActiveStatusAndGrantee.args = {
  consent: TestUtil.testData.consent.activeWithGrantee(),
  onRevokeClick: () => {
    alert(`The revoke button was clicked`);
  },
};

export const WithActiveStatusAndEditAction = Template.bind({});
WithActiveStatusAndEditAction.args = {
  consent: TestUtil.testData.consent.active(),
  editUrl: '/?path=/story/components-molecules-data-holder-header--with-active-status-and-edit-action',
  onRevokeClick: () => {
    alert(`The revoke button was clicked`);
  },
};

export const WithExpiredStatus = Template.bind({});
WithExpiredStatus.args = {
  consent: TestUtil.testData.consent.expired(),
};

export const WithRequestedStatus = Template.bind({});
WithRequestedStatus.args = {
  consent: TestUtil.testData.consent.requested(),
};

export const WithRevokedStatus = Template.bind({});
WithRevokedStatus.args = {
  consent: TestUtil.testData.consent.revoked(),
};
