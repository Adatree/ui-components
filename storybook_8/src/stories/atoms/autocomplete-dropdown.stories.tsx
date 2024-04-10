import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AutocompleteDropdown, DataHolder, TestUtil } from '../../lib';

const meta: Meta<typeof AutocompleteDropdown> = {
  title: 'Components/Atoms/Autocomplete Dropdown',
  component: AutocompleteDropdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AutocompleteDropdown>;

export const Empty: Story = {
  args: {
    dataHolders: TestUtil.testData.dataHolder.allBanking(),
    onChange: (dataHolder: DataHolder | null) => {
      if (dataHolder) {
        alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
      } else {
        alert(`You have cleared the selector.`);
      }
    },
  },
};

export const WithValueSet: Story = {
  args: {
    dataHolders: TestUtil.testData.dataHolder.allBanking(),
    defaultValue: TestUtil.testData.dataHolder.allBanking()[0],
    onChange: (dataHolder: DataHolder | null) => {
      if (dataHolder) {
        alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
      } else {
        alert(`You have cleared the selector.`);
      }
    },
  },
};
export const WithDisabledOptions: Story = {
  args: {
    dataHolders: TestUtil.testData.dataHolder.allBanking(),
    disableDataHolders: [TestUtil.testData.dataHolder.yellowBank()],
    onChange: (dataHolder: DataHolder | null) => {
      if (dataHolder) {
        alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
      } else {
        alert(`You have cleared the selector.`);
      }
    },
  },
};

const dataHoldersOddLogos = [
  { ...TestUtil.testData.dataHolder.redBank(), logoUri: 'https://placehold.co/600x200/FF0000/FFF?text=Wide' },
  { ...TestUtil.testData.dataHolder.yellowBank(), logoUri: 'https://placehold.co/200x600/FFFF00/000?text=Tall' },
];

export const WithOddSizedLogosOptions: Story = {
  args: {
    dataHolders: dataHoldersOddLogos,
    onChange: (dataHolder: DataHolder | null) => {
      if (dataHolder) {
        alert(`You have selected ${dataHolder.brandName} with ID ${dataHolder.dataHolderBrandId}.`);
      } else {
        alert(`You have cleared the selector.`);
      }
    },
  },
};
