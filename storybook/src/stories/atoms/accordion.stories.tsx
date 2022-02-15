import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Accordion } from '../../lib';

export default {
  title: 'Components/Atoms/Accordion',
  component: Accordion,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'This is the title',
  content: <p>This is the Accordion content</p>,
};
