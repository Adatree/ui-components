import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoExtendDateStep } from '../../lib';

export default {
  title: 'Components/Organisms/Consent steps/Extend date info step',
  component: InfoExtendDateStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InfoExtendDateStep>;

const Template: ComponentStory<typeof InfoExtendDateStep> = () => <InfoExtendDateStep />;

export const Default = Template.bind({});
