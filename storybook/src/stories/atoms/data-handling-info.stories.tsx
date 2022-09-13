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

export const WithOneTrustedAdvisor = Template.bind({});
WithOneTrustedAdvisor.args = {
  trustedAdvisors: [TestUtil.testData.trustedAdvisor.trustedAdvisor1()],
};

export const WithManyTrustedAdvisors = Template.bind({});
WithManyTrustedAdvisors.args = {
  trustedAdvisors: TestUtil.testData.trustedAdvisor.all(),
};
