import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataHolderTiles, TestUtil } from '../../lib';

const meta: Meta<typeof DataHolderTiles> = {
  title: 'Components/Atoms/DataHolder Tiles',
  component: DataHolderTiles,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataHolderTiles>;

const dataHolders = TestUtil.testData.dataHolder.allBanking();

export const With4Tiles: Story = {
  args: {
    dataHolders: dataHolders,
    onClick: (dataHolder) => {
      alert(`${dataHolder.brandName} was clicked.`);
    },
  },
};

export const With6Tiles: Story = {
  args: {
    dataHolders: [
      ...dataHolders,
      TestUtil.testData.dataHolder.originalEnergy(),
      TestUtil.testData.dataHolder.yourPowerEnergy(),
    ],

    onClick: (dataHolder) => {
      alert(`${dataHolder.brandName} was clicked.`);
    },
  },
};

export const With8Tiles: Story = {
  args: {
    dataHolders: [
      ...dataHolders,
      TestUtil.testData.dataHolder.originalEnergy(),
      TestUtil.testData.dataHolder.yourPowerEnergy(),
      TestUtil.testData.dataHolder.ecoPowerEnergy(),
      TestUtil.testData.dataHolder.ozGasEnergy(),
    ],

    onClick: (dataHolder) => {
      alert(`${dataHolder.brandName} was clicked.`);
    },
  },
};

export const WithTwoDisabled: Story = {
  args: {
    dataHolders: dataHolders,
    disableDataHolders: [dataHolders[1], dataHolders[3]],
    onClick: (dataHolder) => {
      alert(`${dataHolder.brandName} was clicked.`);
    },
  },
};

export const WithIrregularLogos: Story = {
  args: {
    dataHolders: [
      TestUtil.testData.dataHolder.longBank(),
      TestUtil.testData.dataHolder.redBank(),
      TestUtil.testData.dataHolder.yellowBank(),
      TestUtil.testData.dataHolder.originalEnergy(),
      TestUtil.testData.dataHolder.yourPowerEnergy(),
      TestUtil.testData.dataHolder.ecoPowerEnergy(),
      TestUtil.testData.dataHolder.tallBank(),
      TestUtil.testData.dataHolder.ozGasEnergy(),
    ],

    onClick: (dataHolder) => {
      alert(`${dataHolder.brandName} was clicked.`);
    },
  },
};
