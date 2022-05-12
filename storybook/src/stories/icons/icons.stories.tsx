import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Stack, Typography } from '@mui/material';
import { ApiCogIcon } from '../../lib';

export default {
  title: 'Components/Icons',
  component: Box,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = () => <Box />;

export const icons = Template.bind({});
icons.decorators = [
  (Story) => {
    return (
      <>
        <Story />
        <Typography variant="h3" sx={{ my: 2 }}>
          {'Icon: <ApiCogIcon/ >'}
        </Typography>
        <Stack direction="row" sx={{ svg: { mt: 'auto', mr: 4 } }}>
          <ApiCogIcon sx={{ fontSize: 40 }} />
          <ApiCogIcon sx={{ fontSize: 80 }} />
          <ApiCogIcon sx={{ fontSize: 120 }} />
          <ApiCogIcon sx={{ fontSize: 120 }} color="primary" textColor="#000" />
          <ApiCogIcon sx={{ fontSize: 120 }} color="secondary" />
        </Stack>
      </>
    );
  },
];
