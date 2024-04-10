import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconListItem } from '../../lib';
import { Information } from 'mdi-material-ui';

const meta: Meta<typeof IconListItem> = {
  title: 'Components/Atoms/Icon List Item',
  component: IconListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconListItem>;

export const IconAndText: Story = {
  args: {
    icon: <Information />,
    content: 'This is the text',
  },
};

export const IconAndTextPrimaryColour: Story = {
  args: {
    icon: <Information color="primary" />,
    content: 'This is the text',
  },
};

export const IconAndHtml: Story = {
  args: {
    icon: <Information />,
    content: (
      <>
        <h1>This is a H1 tag</h1>
      </>
    ),
  },
};

export const IconAlignTopAndHtml: Story = {
  args: {
    alignIcon: 'flex-start',
    icon: <Information />,
    content: (
      <>
        <p>The icon is aligned to the top.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Consectetur adipiscing elit.</p>
        <p>Aliquam dolor metus.</p>
      </>
    ),
  },
};
