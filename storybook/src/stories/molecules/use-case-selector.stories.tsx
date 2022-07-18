import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UseCaseSelector, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Use Case Selector',
  component: UseCaseSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UseCaseSelector>;

const useCases = TestUtil.testData.useCase.all();
const Template: ComponentStory<typeof UseCaseSelector> = (args) => <UseCaseSelector {...args} />;

export const WithUseCases = Template.bind({});
WithUseCases.args = {
  useCases: useCases,
  onChange: (useCaseId: string) => {
    alert(`The radio button with the value ${useCaseId} is selected.`);
  },
};
