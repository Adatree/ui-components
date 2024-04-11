import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BlockedDataholderDialog, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Blocked Dataholder Dialog',
  component: BlockedDataholderDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BlockedDataholderDialog>;

const Template: ComponentStory<typeof BlockedDataholderDialog> = (args) => <BlockedDataholderDialog {...args} />;

export const WithAllDates = Template.bind({});
WithAllDates.args = {
  dataHolder: TestUtil.testData.dataHolder.redBank(),
  isOpen: true,
  onClose: () => {
    alert('The close button has been clicked');
  },
};
