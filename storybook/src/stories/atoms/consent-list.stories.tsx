import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentList, TestUtil } from '../../lib';

export default {
  title: 'Components/Atoms/Consent list',
  component: ConsentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentList>;

const Template: ComponentStory<typeof ConsentList> = (args) => <ConsentList {...args} />;

export const Active = Template.bind({});
Active.args = {
  consents: TestUtil.getTestDataConsentResponses(),
  url: '/url-to-the-consent',
};
