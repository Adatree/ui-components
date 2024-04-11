import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LinkExternal } from '../../lib';

export default {
  title: 'Components/Atoms/Links',
  component: LinkExternal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LinkExternal>;

const Template: ComponentStory<typeof LinkExternal> = (args) => <LinkExternal {...args} />;

export const External = Template.bind({});
External.args = {
  href: 'https://www.adatree.com.au/cdrpolicy',
  text: 'This is an external link',
};
