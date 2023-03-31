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
  insights: [TestUtil.testData.insights.identity()],
  dataHolderName: 'Red Australian Bank',
  onChange: (confirmation) => {
    alert(`User has click the confirmation checkbox with the value: ${confirmation}`);
  },
};

export const WithManyInsights = Template.bind({});
WithManyInsights.args = {
  insights: TestUtil.testData.insights.all(),
  dataHolderName: 'Red Australian Bank',
  onChange: (confirmation) => {
    alert(`User has click the confirmation checkbox with the value: ${confirmation}`);
  },
};

export const WithManyInsightsAndDataRecipients = Template.bind({});
WithManyInsightsAndDataRecipients.args = {
  insights: TestUtil.testData.insights.allWithDataRecipients(),
  dataHolderName: 'Red Australian Bank',
  onChange: (confirmation) => {
    alert(`User has click the confirmation checkbox with the value: ${confirmation}`);
  },
};
