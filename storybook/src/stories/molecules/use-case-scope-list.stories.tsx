import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UseCaseScopeList, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Use Case Scope List',
  component: UseCaseScopeList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UseCaseScopeList>;

const homeUseCase = TestUtil.getTestDataHomeUseCase();
const Template: ComponentStory<typeof UseCaseScopeList> = (args) => <UseCaseScopeList {...args} />;

export const ScopeList = Template.bind({});
ScopeList.args = {
  title: 'The data we need',
  subtitle: `We need to collect the below information in order to provide you with ${homeUseCase.name}.`,
  useCase: homeUseCase,
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};

export const ScopeListChecked = Template.bind({});
ScopeListChecked.args = {
  title: 'The data we need',
  subtitle: `We need to collect the below information in order to provide you with ${homeUseCase.name}.`,
  useCase: homeUseCase,
  checkedValues: ['bank:accounts.basic:read', 'common:customer.basic:read'],
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};

export const Loading = Template.bind({});
Loading.args = {
  title: undefined,
  subtitle: undefined,
  useCase: undefined,
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};
