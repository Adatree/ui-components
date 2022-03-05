import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RevokeDialog, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Revoke Dialog',
  component: RevokeDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RevokeDialog>;

const Template: ComponentStory<typeof RevokeDialog> = (args) => <RevokeDialog {...args} />;

export const Open = Template.bind({});
Open.args = {
  dataHolderName: TestUtil.testData.dataHolder.yellowBank().brandName,
  isOpen: true,
  isLoading: false,
  onCancelClick: () => {
    alert('The cancel button has been clicked');
  },
  onRevokeClick: () => {
    alert('The revoke button has been clicked');
  },
};

export const Loading = Template.bind({});
Loading.args = {
  dataHolderName: TestUtil.testData.dataHolder.yellowBank().brandName,
  isOpen: true,
  isLoading: true,
  onCancelClick: () => {
    alert('The cancel button has been clicked');
  },
  onRevokeClick: () => {
    alert('The revoke button has been clicked');
  },
};
