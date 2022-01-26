import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckboxAccordion } from '../lib';

export default {
  title: 'Atom/Checkbox Accordion',
  component: CheckboxAccordion,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CheckboxAccordion>;

const Template: ComponentStory<typeof CheckboxAccordion> = (args) => <CheckboxAccordion {...args} />;

export const Checkbox = Template.bind({});
Checkbox.args = {
  title: 'Account name, type and balance',
  checkboxValue: 'CHK_BOX_VAL',
  checked: true,
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};

export const CheckboxAndSubtitle = Template.bind({});
CheckboxAndSubtitle.args = {
  title: 'Account name, type and balance',
  subtitle: 'This is the subtitle for this Checkbox Accordion.',
  checkboxValue: 'CHK_BOX_VAL',
  checked: true,
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};

export const CheckboxSubtitleAndAccordion = Template.bind({});
CheckboxSubtitleAndAccordion.args = {
  title: 'Account name, type and balance',
  subtitle: 'This is the subtitle for this Checkbox Accordion.',
  checkboxValue: 'CHK_BOX_VAL',
  checked: true,
  items: ['Name of account', 'Type of account', 'Account balance'],
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};
