import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NewFeature } from '../../lib';
import { Button } from '@mui/material';

export default {
  title: 'Components/Atoms/New Feature',
  component: NewFeature,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NewFeature>;

const Template: ComponentStory<typeof NewFeature> = (args) => <NewFeature {...args} />;

export const WithDefaultTitle = Template.bind({});
WithDefaultTitle.args = {
  open: true,
  children: <Button variant="contained">New feature</Button>,
  placement: 'right',
  onClose: () => {
    alert('onClosed fired');
  },
};

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
  title: 'Look at this new feature',
  open: true,
  children: <Button variant="contained">New feature</Button>,
  placement: 'right',
  onClose: () => {
    alert('onClosed fired');
  },
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  description: 'The is a description about the new feature',
  open: true,
  children: <Button variant="contained">New feature</Button>,
  placement: 'right',
  onClose: () => {
    alert('onClosed fired');
  },
};

export const Visible = Template.bind({});
Visible.args = {
  title: 'Look at this new feature',
  open: true,
  children: <Button variant="contained">New feature</Button>,
  placement: 'right',
  onClose: () => {
    alert('onClosed fired');
  },
};

export const Hidden = Template.bind({});
Hidden.args = {
  title: 'This should not be shown',
  open: false,
  children: <Button variant="contained">New feature</Button>,
  placement: 'right',
  onClose: () => {
    alert('onClosed fired');
  },
};
