import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScopeAccordion } from '../../lib';
import { TestUtil } from '../../lib';

export default {
  title: 'Components/Atoms/Scope Accordion',
  component: ScopeAccordion,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ScopeAccordion>;

const Template: ComponentStory<typeof ScopeAccordion> = (args) => <ScopeAccordion {...args} />;

export const WithOneScope = Template.bind({});
WithOneScope.args = {
  scopes: [TestUtil.testData.scope.bankAccountsDetailRead()],
};

export const WithFewScope = Template.bind({});
WithFewScope.args = {
  scopes: [
    TestUtil.testData.scope.bankAccountsDetailRead(),
    TestUtil.testData.scope.commonCustomerBasicRead(),
    TestUtil.testData.scope.energyBillingRead(),
  ],
};

export const WithManyScopes = Template.bind({});
WithManyScopes.args = {
  scopes: TestUtil.testData.scope.all(),
};
