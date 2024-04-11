import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Stack, Typography } from '@mui/material';

export default {
  title: 'Components/Atoms/Typography',
  component: Stack,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Stack>;

const Template: ComponentStory<typeof Stack> = () => (
  <Stack rowGap={2}>
    <Typography variant="h1">Heading 1</Typography>
    <Typography variant="h2">Heading 2</Typography>
    <Typography variant="h3">Heading 3</Typography>
    <Typography variant="h4">Heading 4</Typography>
    <Typography variant="h5">Heading 5</Typography>
    <Typography variant="h6">Heading 6</Typography>
    <Typography variant="body1">Body 1</Typography>
    <Typography variant="body2">Body 2</Typography>
    <Typography variant="subtitle1">Subtitle 1</Typography>
    <Typography variant="subtitle2">Subtitle 2</Typography>
    <Typography variant="button">Button</Typography>
    <Typography variant="caption">Caption</Typography>
    <Typography variant="inherit">Inherit</Typography>
    <Typography variant="overline">Overline</Typography>
  </Stack>
);

export const Default = Template.bind({});
