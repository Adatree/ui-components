import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AutocompleteDropdown, DataHolder } from '../../lib';
import { TestUtil } from '../../lib';

export default {
  title: 'Components/Atoms/Autocomplete Dropdown',
  component: AutocompleteDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AutocompleteDropdown>;

const Template: ComponentStory<typeof AutocompleteDropdown> = (args) => <AutocompleteDropdown {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  dataHolders: TestUtil.testData.dataHolder.allBanking(),
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
  dataHolders: TestUtil.testData.dataHolder.allBanking(),
  defaultValue: TestUtil.testData.dataHolder.allBanking()[0],
  onChange: (dataHolder: DataHolder | null) => {
    if (dataHolder) {
      alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
    } else {
      alert(`You have cleared the selector.`);
    }
  },
};

export const WithDisabledOptions = Template.bind({});
WithDisabledOptions.args = {
  dataHolders: TestUtil.testData.dataHolder.allBanking(),
  disableDataHolders: [TestUtil.testData.dataHolder.yellowBank()],
  onChange: (dataHolder: DataHolder | null) => {
    if (dataHolder) {
      alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
    } else {
      alert(`You have cleared the selector.`);
    }
  },
};
