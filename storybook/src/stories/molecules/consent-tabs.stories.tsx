import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentTabs, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Consent Tabs',
  component: ConsentTabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentTabs>;

const Template: ComponentStory<typeof ConsentTabs> = (args) => <ConsentTabs {...args} />;

export const WithConsentItems = Template.bind({});
WithConsentItems.args = {
  consents: TestUtil.testData.consent.all(),
  dataHolders: TestUtil.testData.dataHolder.all(),
};

export const WithNoConsentItems = Template.bind({});
WithNoConsentItems.args = {
  consents: undefined,
  dataHolders: TestUtil.testData.dataHolder.all(),
};

export const Loading = Template.bind({});
Loading.args = {
  consents: [],
  isLoading: true,
};
