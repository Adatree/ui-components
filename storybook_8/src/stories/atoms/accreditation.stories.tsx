import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accreditation } from '../../lib';

const meta: Meta<typeof Accreditation> = {
  title: 'Components/Atoms/Accreditation',
  component: Accreditation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accreditation>;

export const CdrPrincipal: Story = {
  args: {
    accreditationNumber: '1234-5678',
    companyName: 'TestCompany',
  },
};

export const UnderCdrPrincipal: Story = {
  args: {
    accreditationNumber: '1234-5678',
    companyName: 'TestCompany',
    underCdrPrincipal: true,
  },
};
