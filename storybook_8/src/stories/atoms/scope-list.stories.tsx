import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScopeList, TestUtil } from '../../lib';

const meta: Meta<typeof ScopeList> = {
  title: 'Components/Atoms/Scope List',
  component: ScopeList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScopeList>;

export const WithOneScope: Story = {
  args: {
    scopes: [TestUtil.testData.scope.bankAccountsDetailRead()],
  },
};

export const WithFewScope: Story = {
  args: {
    scopes: [
      TestUtil.testData.scope.bankAccountsDetailRead(),
      TestUtil.testData.scope.commonCustomerBasicRead(),
      TestUtil.testData.scope.energyBillingRead(),
    ],
  },
};

export const WithManyScopes: Story = {
  args: {
    scopes: TestUtil.testData.scope.all(),
  },
};
