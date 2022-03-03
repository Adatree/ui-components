import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UseCaseSummary, TestUtil } from '../../lib';

export default {
  title: 'Components/Molecules/Use Case Summary',
  component: UseCaseSummary,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UseCaseSummary>;

const homeUseCase = TestUtil.testData.useCase.homeLoan();
const Template: ComponentStory<typeof UseCaseSummary> = (args) => <UseCaseSummary {...args} />;

export const HomeUseCase = Template.bind({});
HomeUseCase.args = {
  title: 'Data we are currently receiving',
  useCase: TestUtil.testData.useCase.homeLoan(),
};

export const BudgetingToolUseCase = Template.bind({});
BudgetingToolUseCase.args = {
  title: 'Data we are currently receiving',
  useCase: TestUtil.testData.useCase.onceOffConsentMinScopes(),
};
