import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InsightConfirmationForm } from '../../lib';
import { TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Insight Confirmation Form',
  component: InsightConfirmationForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InsightConfirmationForm>;

const Template: ComponentStory<typeof InsightConfirmationForm> = (args) => <InsightConfirmationForm {...args} />;

export const WithOneInsight = Template.bind({});
WithOneInsight.args = {
  insightResponse: TestUtil.testData.insights.single(),
  dataHolderName: 'Red Australian Bank',
  onChange: (confirmation) => {
    alert(`User has click the confirmation checkbox with the value: ${confirmation}`);
  },
};

export const WithManyInsights = Template.bind({});
WithManyInsights.args = {
  insightResponse: TestUtil.testData.insights.all(),
  dataHolderName: 'Red Australian Bank',
  onChange: (confirmation) => {
    alert(`User has click the confirmation checkbox with the value: ${confirmation}`);
  },
};
