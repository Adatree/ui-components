import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentSectionDeIdentify } from '../../lib';

const meta: Meta<typeof ConsentSectionDeIdentify> = {
  title: 'Components/Molecules/Consent Section DeIdentify',
  component: ConsentSectionDeIdentify,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentSectionDeIdentify>;

export const Default: Story = {
  args: {
    showError: false,
    onCheck: (value) => {
      alert(`De-identify switch value is ${value}`);
    },
  },
};

export const WithChecked: Story = {
  args: {
    showError: false,
    checked: true,
    onCheck: (value) => {
      alert(`De-identify switch value is ${value}`);
    },
  },
};
