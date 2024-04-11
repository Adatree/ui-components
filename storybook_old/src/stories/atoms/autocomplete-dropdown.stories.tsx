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

export const WithOddSizedLogosOptions = Template.bind({});
const dataHoldersOddLogos = [
  { ...TestUtil.testData.dataHolder.redBank(), logoUri: 'https://placehold.co/600x200/FF0000/FFF?text=Wide' },
  { ...TestUtil.testData.dataHolder.yellowBank(), logoUri: 'https://placehold.co/200x600/FFFF00/000?text=Tall' },
];
WithOddSizedLogosOptions.args = {
  dataHolders: dataHoldersOddLogos,
  onChange: (dataHolder: DataHolder | null) => {
    if (dataHolder) {
      alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
    } else {
      alert(`You have cleared the selector.`);
    }
  },
};
