import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconListItem } from '../../lib';
import { Information } from 'mdi-material-ui';

export default {
  title: 'Components/Atoms/Icon list item',
  component: IconListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof IconListItem>;

const Template: ComponentStory<typeof IconListItem> = (args) => <IconListItem {...args} />;

export const IconAndText = Template.bind({});
IconAndText.args = {
  icon: <Information />,
  content: 'This is the text',
};

export const IconAndTextPrimaryColour = Template.bind({});
IconAndTextPrimaryColour.args = {
  icon: <Information color="primary" />,
  content: 'This is the text',
};

export const IconAndHtml = Template.bind({});
IconAndHtml.args = {
  icon: <Information />,
  content: (
    <>
      <h1>This is a H1 tag</h1>
    </>
  ),
};

export const IconAlignTopAndHtml = Template.bind({});
IconAlignTopAndHtml.args = {
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
};
