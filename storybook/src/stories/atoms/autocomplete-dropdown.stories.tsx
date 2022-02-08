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

export const WithBanks = Template.bind({});
WithBanks.args = {
  dataHolders: TestUtil.getTestDataDataHolder(),
  onChange: (dataHolder: DataHolder | null) => {
    if (dataHolder) {
      alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
    } else {
      alert(`You have cleared the selector.`);
    }
  },
};
