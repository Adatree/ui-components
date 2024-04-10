import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PartnerMessage } from '../../lib';

const meta: Meta<typeof PartnerMessage> = {
  title: 'Components/Atoms/Partner Message',
  component: PartnerMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PartnerMessage>;

export const Default: Story = {
  args: {
    dataHolderName: 'Red Bank Australia',
  },
};

export const WithDiscreetMode: Story = {
  args: {
    dataHolderName: 'Red Bank Australia',
    discreetMode: true,
  },
};
