import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TrustedAdvisorSelector, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Trusted Advisor Selector',
  component: TrustedAdvisorSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TrustedAdvisorSelector>;

const trustedAdvisors = TestUtil.testData.dataHandler.all();
const Template: ComponentStory<typeof TrustedAdvisorSelector> = (args) => <TrustedAdvisorSelector {...args} />;

export const WithUseCases = Template.bind({});
WithUseCases.args = {
  trustedAdvisors: trustedAdvisors,
  onChange: (trustedAdvisorId: string) => {
    alert(`The radio button with the value ${trustedAdvisorId} is selected.`);
  },
};
