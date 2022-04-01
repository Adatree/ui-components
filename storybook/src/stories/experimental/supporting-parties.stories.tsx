import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SupportingParties, TestUtil } from '../../lib';

export default {
  title: 'Experimental/Supporting parties/Supporting parties',
  component: SupportingParties,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SupportingParties>;

const Template: ComponentStory<typeof SupportingParties> = (args) => <SupportingParties {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Supporting parties',
  useCase: TestUtil.testData.useCase.homeLoan(),
};
