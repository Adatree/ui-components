import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DataAccessStep, TestUtil } from '../../lib';

export default {
  title: 'Atomic Components/Organisms/Consent steps/Data access step',
  component: DataAccessStep,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DataAccessStep>;

const Template: ComponentStory<typeof DataAccessStep> = (args) => <DataAccessStep {...args} />;

export const WithHomeUseCase = Template.bind({});
WithHomeUseCase.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataHomeUseCase(),
  isValid: (isValid) => {
    alert(`This step is ${isValid ? '' : 'not '}valid`);
  },
};

export const WithBudgetingToolUseCase = Template.bind({});
WithBudgetingToolUseCase.args = {
  companyName: 'Adatree',
  useCase: TestUtil.getTestDataBudgetingToolUseCase(),
  isValid: (isValid) => {
    alert(`This step is ${isValid ? '' : 'not '}valid`);
  },
};
