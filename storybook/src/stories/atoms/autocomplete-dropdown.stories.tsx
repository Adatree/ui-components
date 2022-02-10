import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AutocompleteDropdown, DataHolder } from '../../lib';
import { TestUtil } from '../../lib';

export default {
  title: 'Atomic Components/Atoms/Autocomplete Dropdown',
  component: AutocompleteDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AutocompleteDropdown>;

const Template: ComponentStory<typeof AutocompleteDropdown> = (args) => <AutocompleteDropdown {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  dataHolders: TestUtil.getTestDataAllDataHolders(),
  onChange: (dataHolder: DataHolder | null) => {
    if (dataHolder) {
      alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
    } else {
      alert(`You have cleared the selector.`);
    }
  },
};

export const WithValueSet = Template.bind({});
WithValueSet.args = {
  dataHolders: TestUtil.getTestDataAllDataHolders(),
  defaultValue: TestUtil.getTestDataAllDataHolders()[0],
  onChange: (dataHolder: DataHolder | null) => {
    if (dataHolder) {
      alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
    } else {
      alert(`You have cleared the selector.`);
    }
  },
};
