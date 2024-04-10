import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxAccordion } from '../../lib';

const meta: Meta<typeof CheckboxAccordion> = {
  title: 'Components/Atoms/Checkbox Accordion',
  component: CheckboxAccordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckboxAccordion>;

export const Checkbox: Story = {
  args: {
    title: 'Account name, type and balance',
    checkboxValue: 'CHK_BOX_VAL',
    checked: true,
    onChange: (isChecked, value) => {
      alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
    },
  },
};
export const CheckboxWithAccordion: Story = {
  args: {
    title: 'Account name, type and balance',
    checkboxValue: 'CHK_BOX_VAL',
    checked: true,
    items: ['Name of account', 'Type of account', 'Account balance'],
    onChange: (isChecked, value) => {
      alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
    },
  },
};
export const CheckboxWithAccordionAndSubtitle: Story = {
  args: {
    title: 'Account name, type and balance',
    subtitle: 'This is the subtitle for this Checkbox Accordion.',
    checkboxValue: 'CHK_BOX_VAL',
    checked: true,
    items: ['Name of account', 'Type of account', 'Account balance'],
    onChange: (isChecked, value) => {
      alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
    },
  },
};
