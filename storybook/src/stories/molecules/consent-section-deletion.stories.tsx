import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentSectionDeletion } from '../../lib';

export default {
  title: 'Components/Molecules/Consent Section Deletion',
  component: ConsentSectionDeletion,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentSectionDeletion>;

const Template: ComponentStory<typeof ConsentSectionDeletion> = (args) => <ConsentSectionDeletion {...args} />;

export const Default = Template.bind({});
Default.args = {
  showError: false,
  onRadioCheck: (value) => {
    alert(`Radio button value is ${value}`);
  },
};
