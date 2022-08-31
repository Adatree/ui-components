import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PartnerMessage } from '../../lib';

export default {
  title: 'Components/Atoms/Partner Message',
  component: PartnerMessage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PartnerMessage>;

const Template: ComponentStory<typeof PartnerMessage> = (args) => <PartnerMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataHolderName: 'Red Bank Australia',
};

export const WithDiscreetMode = Template.bind({});
WithDiscreetMode.args = {
  dataHolderName: 'Red Bank Australia',
  discreetMode: true,
};
