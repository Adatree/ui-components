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
  insightResponse: TestUtil.testData.insights.single(),
  dataHolderName: 'Red Australian Bank',
};

export const WithManyInsights = Template.bind({});
WithManyInsights.args = {
  insightResponse: TestUtil.testData.insights.all(),
  dataHolderName: 'Red Australian Bank',
};
