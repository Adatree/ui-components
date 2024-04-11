import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DataHandlingInfo, TestUtil } from '../../lib';

export default {
  title: 'Components/Atoms/Data Handling Information',
  component: DataHandlingInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataHandlingInfo>;

const Template: ComponentStory<typeof DataHandlingInfo> = (args) => <DataHandlingInfo {...args} />;

export const WithOneDataHandler = Template.bind({});
WithOneDataHandler.args = {
  dataHandlers: [TestUtil.testData.dataRecipient.accreditedDataRecipient()],
};

export const WithManyDataHandler = Template.bind({});
WithManyDataHandler.args = {
  dataHandlers: TestUtil.testData.dataRecipient.all(),
};
