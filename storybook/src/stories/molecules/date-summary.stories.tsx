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

export const WithAllDates = Template.bind({});
WithAllDates.args = {
  title: 'Data we are currently receiving',
  consent: TestUtil.getTestDataConsentResponses()[2],
};

export const WithOngoingFrequency = Template.bind({});
WithOngoingFrequency.args = {
  title: 'Data we are currently receiving',
  consent: TestUtil.getTestDataConsentResponse(),
};

export const WithOnceOffFrequency = Template.bind({});
WithOnceOffFrequency.args = {
  title: 'Data we are currently receiving',
  consent: TestUtil.getTestDataConsentResponses()[1],
};
