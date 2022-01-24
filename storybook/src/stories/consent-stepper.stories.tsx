import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConsentStepperDesktop } from '../lib';

export default {
  title: 'Consent/Stepper',
  component: ConsentStepperDesktop,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConsentStepperDesktop>;

const Template: ComponentStory<typeof ConsentStepperDesktop> = (args) => <ConsentStepperDesktop {...args} />;

export const Desktop = Template.bind({});
Desktop.args = {
  steps: [
    {
      label: 'This is step 1',
      content: <>This is Step 1's content.</>,
      onPrevious: () => {
        alert('onPrevious from step 1 clicked.');
        return '';
      },
      onNext: () => {
        alert('onNext from step 1 clicked.');
        return '';
      },
    },
    {
      label: 'This is step 2',
      content: <>This is Step 2's content.</>,
      onPrevious: () => {
        alert('onPrevious from step 2 clicked.');
        return '';
      },
      onNext: () => {
        alert('onNext from step 2 clicked.');
        return '';
      },
    },
    {
      label: 'This is step 3',
      content: <>This is Step 3's content.</>,
      nextButtonLabel: 'Consent',
      onPrevious: () => {
        alert('onPrevious from step 3 clicked.');
        return '';
      },
      onNext: () => {
        alert('onNext from step 3 clicked.');
        return '';
      },
    },
  ],
};
