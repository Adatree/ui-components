import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MaxAccountConnectedMessage } from '../../lib';
import { TestUtil } from '../../lib';

export default {
  title: 'Components/Atoms/Max Account Message',
  component: MaxAccountConnectedMessage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MaxAccountConnectedMessage>;

const Template: ComponentStory<typeof MaxAccountConnectedMessage> = (args) => <MaxAccountConnectedMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  useCase: TestUtil.testData.useCase.homeLoan(),
  onClick: () => {
    alert('onClick fired');
  },
};
