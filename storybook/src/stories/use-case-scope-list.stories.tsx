import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UseCaseScopeList, TestUtil } from '../lib';

export default {
  title: 'Atomic Components/Molecules/Use Case Scope List',
  component: UseCaseScopeList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UseCaseScopeList>;

const Template: ComponentStory<typeof UseCaseScopeList> = (args) => <UseCaseScopeList {...args} />;

export const ScopeList = Template.bind({});
ScopeList.args = {
  useCase: TestUtil.getTestDataHomeUseCase(),
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};
