import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScopeListSwitch } from '../../lib';
import { TestUtil } from '../../lib';

const companyName = 'TestCompany';

const handleChange = (isAllClicked: boolean) => {
  if (isAllClicked) {
    alert('All scopes have been selected');
  }
  console.log(`Are all scopes clicked: ${isAllClicked}`);
};

export default {
  title: 'Components/Atoms/Scope List with Switches',
  component: ScopeListSwitch,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ScopeListSwitch>;

const Template: ComponentStory<typeof ScopeListSwitch> = (args) => <ScopeListSwitch {...args} />;

export const WithOneScope = Template.bind({});
WithOneScope.args = {
  scopes: [TestUtil.testData.scope.bankAccountsDetailRead()],
  companyName: companyName,
  onChange: handleChange,
};

export const WithFewScope = Template.bind({});
WithFewScope.args = {
  scopes: [
    TestUtil.testData.scope.bankAccountsDetailRead(),
    TestUtil.testData.scope.commonCustomerBasicRead(),
    TestUtil.testData.scope.energyBillingRead(),
  ],
  companyName: companyName,
  onChange: handleChange,
};

export const WithManyScopes = Template.bind({});
WithManyScopes.args = {
  scopes: TestUtil.testData.scope.all(),
  companyName: companyName,
  onChange: handleChange,
};
