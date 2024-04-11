import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SectionCard } from '../../lib';

export default {
  title: 'Components/Atoms/Section card',
  component: SectionCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SectionCard>;

const Template: ComponentStory<typeof SectionCard> = (args) => <SectionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Data retention',
  subtitle: 'What should Adatree do with your redundant data at consent expiry or withdrawal?',
  content: (
    <>
      <p>Some content</p>
    </>
  ),
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  title: 'Data retention',
  subtitle: 'What should Adatree do with your redundant data at consent expiry or withdrawal?',
  tooltip: 'Some tooltip',
  content: (
    <>
      <p>Some content</p>
    </>
  ),
};

export const Loading = Template.bind({});
Loading.args = {
  title: undefined,
  subtitle: undefined,
  content: undefined,
};
