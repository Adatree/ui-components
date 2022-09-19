import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DataDisclosure, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Data Disclosure',
  component: DataDisclosure,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataDisclosure>;

const Template: ComponentStory<typeof DataDisclosure> = (args) => <DataDisclosure {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataRecipients: TestUtil.testData.dataRecipient.all(),
};
