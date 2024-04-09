import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LinkExternal } from '../../lib';

const meta: Meta<typeof LinkExternal> = {
  title: 'Components/Atoms/Links',
  component: LinkExternal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LinkExternal>;

export const Primary: Story = {
  args: {
    href: 'https://www.adatree.com.au/cdrpolicy',
    text: 'This is an external link',
  },
};
