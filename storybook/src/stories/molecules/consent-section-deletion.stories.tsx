import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentSectionDeIdentify } from '../../lib';

export default {
  title: 'Components/Molecules/Consent Section De-identify',
  component: ConsentSectionDeIdentify,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentSectionDeIdentify>;

const Template: ComponentStory<typeof ConsentSectionDeIdentify> = (args) => <ConsentSectionDeIdentify {...args} />;

export const Default = Template.bind({});
Default.args = {
  showError: false,
  onCheck: (value) => {
    alert(`De-identify switch value is ${value}`);
  },
};
