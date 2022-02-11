import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentTabs, TestUtil } from '../../lib';

export default {
  title: 'Consent/Tabs',
  component: ConsentTabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentTabs>;

const Template: ComponentStory<typeof ConsentTabs> = (args) => <ConsentTabs {...args} />;

export const WithConsentItems = Template.bind({});
WithConsentItems.args = {
  consents: TestUtil.getTestDataConsentResponses(),
};

export const WithNoConsentItems = Template.bind({});
WithNoConsentItems.args = {
  consents: undefined,
};
