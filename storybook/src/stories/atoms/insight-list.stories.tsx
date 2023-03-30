import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InsightList } from '../../lib';
import { TestUtil } from '../../lib';

export default {
  title: 'Components/Atoms/Insight List',
  component: InsightList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InsightList>;

const Template: ComponentStory<typeof InsightList> = (args) => <InsightList {...args} />;

export const WithOneInsight = Template.bind({});
WithOneInsight.args = {
  insights: [TestUtil.testData.insights.identity()],
};

export const WithManyInsights = Template.bind({});
WithManyInsights.args = {
  insights: TestUtil.testData.insights.all(),
};
