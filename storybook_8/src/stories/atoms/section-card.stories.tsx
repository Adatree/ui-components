import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SectionCard } from '../../lib';

const meta: Meta<typeof SectionCard> = {
  title: 'Components/Atoms/Section Card',
  component: SectionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionCard>;

export const Default: Story = {
  args: {
    title: 'Data retention',
    subtitle: 'What should Adatree do with your redundant data at consent expiry or withdrawal?',
    content: (
      <>
        <p>Some content</p>
      </>
    ),
  },
};

export const WithTooltip: Story = {
  args: {
    title: 'Data retention',
    subtitle: 'What should Adatree do with your redundant data at consent expiry or withdrawal?',
    tooltip: 'Some tooltip',
    content: (
      <>
        <p>Some content</p>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    title: undefined,
    subtitle: undefined,
    content: undefined,
  },
};
