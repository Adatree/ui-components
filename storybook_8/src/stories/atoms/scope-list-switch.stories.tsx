import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScopeListSwitch, TestUtil } from '../../lib';

const meta: Meta<typeof ScopeListSwitch> = {
  title: 'Components/Atoms/Scope List Switch',
  component: ScopeListSwitch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScopeListSwitch>;

const handleChange = (isAllClicked: boolean) => {
  if (isAllClicked) {
    alert('All scopes have been selected');
  }
  console.log(`Are all scopes clicked: ${isAllClicked}`);
};

export const WithOneScope: Story = {
  args: {
    scopes: [TestUtil.testData.scope.bankAccountsDetailRead()],
    onChange: handleChange,
  },
};

export const WithFewScope: Story = {
  args: {
    scopes: [
      TestUtil.testData.scope.bankAccountsDetailRead(),
      TestUtil.testData.scope.commonCustomerBasicRead(),
      TestUtil.testData.scope.energyBillingRead(),
    ],
    onChange: handleChange,
  },
};

export const WithManyScopes: Story = {
  args: {
    scopes: TestUtil.testData.scope.all(),
    onChange: handleChange,
  },
};
