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

export const CheckboxWithAccordion = Template.bind({});
CheckboxWithAccordion.args = {
  title: 'Account name, type and balance',
  subTitle: 'This is the subtitle for this Checkbox Accordion.',
  checkboxValue: 'CHK_BOX_VAL',
  checked: true,
  items: ['Name of account', 'Type of account', 'Account balance'],
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};

export const CheckboxWithoutAccordion = Template.bind({});
CheckboxWithoutAccordion.args = {
  title: 'Account name, type and balance',
  subTitle: 'This is the subtitle for this Checkbox Accordion.',
  checkboxValue: 'CHK_BOX_VAL',
  checked: true,
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};

export const CheckboxWithoutAccordionAndSubtitle = Template.bind({});
CheckboxWithoutAccordionAndSubtitle.args = {
  title: 'Account name, type and balance',
  checkboxValue: 'CHK_BOX_VAL',
  checked: true,
  onChange: (isChecked, value) => {
    alert(`The checkbox with the value ${value} is ${isChecked ? '' : 'not'} checked`);
  },
};
