import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateSummary, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Date Summary',
  component: DateSummary,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DateSummary>;

const Template: ComponentStory<typeof DateSummary> = (args) => <DateSummary {...args} />;

export const WithDateDuration = Template.bind({});
WithDateDuration.args = {
  title: 'Data we are currently receiving',
  consent: TestUtil.testData.consent.all()[2],
};

export const WithCustomDuration = Template.bind({});
WithCustomDuration.args = {
  title: 'Data we are currently receiving',
  consent: TestUtil.testData.consent.active(),
};

export const WithOnceOffDuration = Template.bind({});
WithOnceOffDuration.args = {
  title: 'Data we are currently receiving',
  consent: TestUtil.testData.consent.all()[1],
};
