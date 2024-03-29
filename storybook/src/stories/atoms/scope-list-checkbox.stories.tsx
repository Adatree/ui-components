import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScopeListCheckbox } from '../../lib';
import { TestUtil } from '../../lib';

const handleChange = (isAllClicked: boolean) => {
  if (isAllClicked) {
    alert('All scopes have been selected');
  }
  console.log(`Are all scopes clicked: ${isAllClicked}`);
};

export default {
  title: 'Components/Atoms/Scope List with Checkboxes',
  component: ScopeListCheckbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ScopeListCheckbox>;

const Template: ComponentStory<typeof ScopeListCheckbox> = (args) => <ScopeListCheckbox {...args} />;

export const WithOneScope = Template.bind({});
WithOneScope.args = {
  scopes: [TestUtil.testData.scope.bankAccountsDetailRead()],
  onChange: handleChange,
};

export const WithFewScope = Template.bind({});
WithFewScope.args = {
  scopes: [
    TestUtil.testData.scope.bankAccountsDetailRead(),
    TestUtil.testData.scope.commonCustomerBasicRead(),
    TestUtil.testData.scope.energyBillingRead(),
  ],
  onChange: handleChange,
};

export const WithManyScopes = Template.bind({});
WithManyScopes.args = {
  scopes: TestUtil.testData.scope.all(),
  onChange: handleChange,
};
